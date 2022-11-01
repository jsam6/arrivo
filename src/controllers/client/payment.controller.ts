import { NextFunction, raw, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()
const stripe = require('stripe')('sk_test_51LzJRLGTNmh9e5XJzPBOQC5yAdIpW48t5HgiMALe8eliRBZxK83H3ikGgGjuvDRkWdBZrOoRdZ8ESLwdx830CiIL00niNXSkGY')

declare module "express" { 
    export interface Request {
      token: any
    }
}
const YOUR_DOMAIN = 'http://localhost:3002';

const makePayment = async (req:Request, res:Response, next:NextFunction) => {
    let token = jwt.decode(req.token, 'secretkey')
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1LzJSuGTNmh9e5XJ2A1XWoCS',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/payment/cancel`,
    });

    console.log(session.url)

}

const successCallback = async (req:Request, res:Response, next:NextFunction) => {
    console.log("successCallback" , req.query.session_id)

    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

        // verify is payment_id alrd exist
        const paymentExist = await prisma.payment.findFirst({
            where: {
                payment_id: session.payment_intent,
            }
        })
        if (paymentExist) return res.status(200).send({message: "Thank you!"})

        const payment = await prisma.payment.create({
            data: {
                payment_id: session.payment_intent,
                amount: session.amount_total.toString(),
                payment_method: "stripe",
                status: 1
            }
        })

        console.log(session)
        res.status(200).send({message: "Thank you!"})
    } catch (err:any) {
        res.status(404).send({message: "Invalid session_id"})
    }
}

const cancelCallback = async (req:Request, res:Response, next:NextFunction) => {
    console.log("cancelCallback")
    res.status(200).send({message: "cancel"})

}


export {
    makePayment, cancelCallback, successCallback
}



    // res.redirect(303, session.url);

    // axios.get("https://www.billplz.com/api/v4/webhook_rank", {
    //     headers:{
    //         "Authorization": "Basic OTkwNmNiMDUtNDg3YS00MjUxLTg4OGMtYzY5NThjMTYzNzhl"
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(err=>{ 
    //     console.log(err)
    // })

    // axios.get("https://www.billplz.com/api/v4/payment_gateways", {
    //     headers:{
    //         "Authorization": "9906cb05-487a-4251-888c-c6958c16378e"
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(err=>{ 
    //     console.log(err)
    // })


    // axios.post("https://www.billplz.com/api/v3/bills", {
    //     collection_id: "zg17avsa7",
    //     description: "Maecenas eu placerat ante.",
    //     email: "api@billplz.com",
    //     name: "Sara",
    //     amount: "200",
    //     callback_url: "http://localhost:3002/payment/billplz/",
    //     reference_1_label:"Bank Code",
    //     reference_1:"BP-FKR01"
    // }, {
    //     headers: {
    //         'Authorization': "Basic 9906cb05-487a-4251-888c-c6958c16378e"
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(err=>{ 
    //     console.log(123)
    // })