import clsx from "clsx"

function Input({ label, errorMessage, placeholder, register, type, id, isError=false}:
 {
    label: string,
    placeholder: string,
    type: string,
    id: string,
    register: any
    errorMessage: string | undefined,
    isError: boolean,
 }) {
  return (
    <div>
        <label className="label">
                <span className={clsx(isError ? 'text-error' : '', "label-text")}>{label}</span>
        </label>
        <input type={type} id={id} placeholder={placeholder}
         className={clsx(isError ? 'input-error' : '', "input input-bordered input-accent w-full max-w-xs")} 
         {...register(id)}/>
        {
            isError ? <label className="label">
                <span className="label-text-alt text-error">{errorMessage}</span>
            </label> : null
        }
    </div>
  )
}

export default Input