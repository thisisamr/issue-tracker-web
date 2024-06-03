import dummydata from './issues.json'
import prisma from './client'
type Dummy = {
  issueTitle: string
  issueDescription: string
}
async function main() {

  for (const i of dummydata as Dummy[]) {
    await prisma.issue.create({
      data: {
        title: i.issueTitle,
        description: i.issueDescription
      }
    })
  }
}

main().catch(e => console.log(e))


