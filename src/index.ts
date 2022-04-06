
import { createServer } from "http";
import { parse } from "url";

function main() {

  let data = Buffer.alloc(1024, " ");

  let kbSize = 1024;

  let server = createServer((req, res) => {
    let timeStart = Date.now();
    let urlData = parse(req.url, true);
    
    if (urlData.query["payloadSizeKB"]) {
      kbSize = parseInt(urlData.query["payloadSizeKB"] as string);
      
      res.write("start", ()=>{
      });
  
      for (let i = 0; i < kbSize; i++) {
        res.write(data);
      }
  
      res.write("end\n", ()=>{
        let timeEnd = Date.now();
        let timeEnlapsed = timeEnd - timeStart;
        let timeEnlapsedString = (timeEnlapsed / 1000).toFixed(1);
    
        let kbps = (kbSize / (timeEnlapsed / 1000));
        let mbps = kbps/1000;
        
        let msg = `Took ${timeEnlapsedString}s to send ${kbSize}kb, averaging ${kbps.toFixed(0)}kbps or ${mbps.toFixed(0)}mbps`;
        console.log(msg);
        res.write(msg);
        res.end();
      });

    } else {
      res.end(`
      <html>
      <head></head>
      <body>
      <script>
      let timeStart = Date.now();

      fetch(window.location.host + "/?payloadSizeKB=16000").then(()=>{
        let timeEnd = Date.now();
        let timeEnlapsed = timeEnd - timeStart;
        let sEnlapsed = timeEnlapsed / 1000;
        console.log(sEnlapsed.toFixed(2) + "s")
      });
      </script>
      </body>
      </html>
      `);
    }


  });

  server.listen(8080);

}

main();
