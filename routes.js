const fs = require('fs');

const requestHandler=(req,res)=>{
    const url = req.url; 
    if(url ==='/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/message' && req.method ==='POST'){
        const body =[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Nodejs Server</h1></body>');
    res.write('</html>');
    res.end();

}
module.exports = requestHandler;