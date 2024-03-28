import classes from '@/app/shared_components/buttons/PrimaryButton.module.css'
import baseClasses from '@/app/base.module.css'

export default function PrimaryButton ({ children, onClick }: any): JSX.Element {
  return (
    <button onClick={onClick} className={`${baseClasses.normal_text} ${classes.primary_button}`}>
      {children}
    </button>
  )
}
