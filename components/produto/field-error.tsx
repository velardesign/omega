export default function FieldError({error}:{error?:string}){
    if (!error) return null;
    return (
        <p className="text-sm text-red-400 py-2 wrap-break-word">{error}</p>
    )
}