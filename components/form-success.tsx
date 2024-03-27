import { CheckCircledIcon} from "@radix-ui/react-icons"

interface FromSuccessProps {
  message: string | undefined
}

export const FormSuccess = ({
  message
}: FromSuccessProps) => {
    if(!message) return null
  return (
    <div className="items-center bg-emerald-500/15 p-3 rounded-md flex gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4"/>
      <p>{message}</p>
    </div>
  )
}