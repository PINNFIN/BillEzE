import {createServer} from 'node:http';
import {validatePaymentRequest} from './payment-security.mjs';
// Local development gateway: deliberately excludes a payment processor, auth session,
// database, payment token write APIs, and live disbursement capabilities.
const host='127.0.0.1',port=Number(process.env.PORT||8787);
createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'none'");res.setHeader('Content-Type','application/json; charset=utf-8');
 function reply(status,obj){res.writeHead(status);res.end(JSON.stringify(obj))}
 if(req.method==='GET'&&req.url==='/health')return reply(200,{service:'BillEzE payment gateway scaffold',mode:'disabled',realPayments:false});
 if(req.method==='POST'&&req.url==='/v1/payments/authorize'){
  // Reject all payment attempts before accepting card or bank information.
  return reply(501,{code:'PROCESSOR_NOT_CONFIGURED',message:'Real payments are disabled. Do not supply card or banking credentials.'});
 }
 if(req.method==='POST'&&req.url==='/v1/wallet/payment-methods'){
  return reply(501,{code:'TOKENIZATION_NOT_CONFIGURED',message:'Use a PCI-compliant provider-hosted collection flow once implemented. Never send PAN/CVV to BillEzE.'});
 }
 reply(404,{code:'NOT_FOUND'});
}).listen(port,host,()=>console.log('BillEzE local disabled-payment gateway listening on http://'+host+':'+port));
