import classes from '@/app/shared_components/buttons/PrimaryButton.module.css'

export default function PrimaryButton ({ children, onClick }: any): JSX.Element {
  return (
    <button onClick={onClick} className={classes.primary_button}>
      {children}
    </button>
  )
}
