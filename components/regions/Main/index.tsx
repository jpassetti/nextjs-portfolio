import styles from './main.module.scss';

const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
}
const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.main__content}>{children}</div>;
}
Main.Content = Content;

export default Main;