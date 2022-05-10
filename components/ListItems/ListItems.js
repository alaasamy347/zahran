// Main Imports
import { useState } from "react";
// Components
import CustomAccordion, {
  AccordionItem,
} from "../CustomAccordion/CustomAccordion";
// Styles
import styles from "./ListItems.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// Redux
import { useSelector } from "react-redux";

const ListItems = ({ categories }) => {
  const { lang } = useSelector((state) => state.shared);

  const [isOpen, setIsOpen] = useState(false);

  const subIcon = isOpen ? (
    <FontAwesomeIcon icon={faMinus} />
  ) : (
    <FontAwesomeIcon icon={faPlus} />
  );

  return (
    <ul className={styles.parent}>
      {categories?.map((mainCat) => {
        if (Object.keys(mainCat).includes("subCategories")) {
          return (
            <CustomAccordion flush key={mainCat.id}>
              <AccordionItem
                eventKey={mainCat.id}
                header={lang === "en" ? mainCat.title : mainCat.titleAR}
                iconPosition="start"
                icon={subIcon}
                onClick={() => setIsOpen((prev) => !prev)}
                className="sub"
              >
                <ul className={styles.parent}>
                  {mainCat?.subCategories?.map((subCat) => (
                    <li key={subCat.id}>
                      <a href="#">
                        {lang === "en" ? subCat.title : subCat.titleAR}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </CustomAccordion>
          );
        }
        return (
          <li key={mainCat.id}>
            <a href="#">{lang === "en" ? mainCat.title : mainCat.titleAR}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default ListItems;
