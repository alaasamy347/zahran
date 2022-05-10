// Bootstrap Componetns
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
// Styles
import styles from "./CustomAccordion.module.css";

export const AccordionItem = (props) => {
  const {
    eventKey,
    header,
    icon = <FontAwesomeIcon icon={faChevronDown} />,
    iconPosition = "end",
    onClick,
    children,
    ...others
  } = props;

  return (
    <Accordion.Item eventKey={eventKey} {...others}>
      <Accordion.Header onClick={onClick}>
        {header}
        <span
          className={styles[iconPosition]}
          style={{ order: iconPosition === "end" ? "auto" : "-1" }}
        >
          {icon}
        </span>
      </Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

const CustomAccordion = (props) => {
  const { children, ...others } = props;

  return <Accordion {...others}>{children}</Accordion>;
};

export default CustomAccordion;
