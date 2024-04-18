import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import prisma from '@/prisma/client'

interface Props{
params:{id:string}
}
export default async function Edit({params}:Props) {
  const issue = await  prisma.issue.findUnique({where:{id:parseInt(params.id)}})
  if (!issue ){
    return notFound()
  }
  return <IssueForm issue={issue}/>
}
