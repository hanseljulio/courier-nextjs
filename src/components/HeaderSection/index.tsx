import styles from "../GreetUser/GreetUserNav.module.css";

interface UserHeaderProps {
  title?: string;
  description?: string;
}

function UserHeader(props: UserHeaderProps) {
  return (
    <div
      className={`${styles.greetingArea} flex justify-between greet-user-div mx-[350px] pt-[50px]`}
    >
      <div className="header-section">
        <h1 className="text-[30px] font-medium pb-2 text-amber-600">
          {props.title}
        </h1>
        <h1>{props.description}</h1>
      </div>
    </div>
  );
}

export default UserHeader;
