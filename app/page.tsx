import Image from "next/image";
import {prisma} from "@/lib/prisma"


export default async  function Home() {
  console.log(await prisma.clientes.findMany());
  return (
  <div>

  </div>
  )
}
