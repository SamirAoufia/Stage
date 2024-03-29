import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

const handler = (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method === 'POST') {
    try{
      const user = db.user.findMany();
      res.status(200).json(user);
      console.log(user);
    }catch(e: any){
      res.status(500).json({error: (e as Error).message});
    }
  }else{
    res.status(405).json({error: 'Method not allowed'});
  }

}

export default handler;