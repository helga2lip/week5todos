import styles from './Button.module.css'

export function Button(props) {
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  }

  return <button className={styles.button} type='button' onClick={onClick} disabled={props.disabled}>{props.children}</button>
}