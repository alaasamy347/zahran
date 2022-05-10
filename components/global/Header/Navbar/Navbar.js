// Main Imports
import { useState, useEffect } from "react";
// Components
import NavbarBrand from "./NavbarBrand/NavbarBrand";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
import NavbarOptions from "./NavbarOptions/NavbarOptions";
import CustomOffcanvas from "../../../CustomOffcanvas/CustomOffcanvas";
import CustomModal from "../../../CustomModal/CustomModal";
import CustomAccordion, {
  AccordionItem,
} from "../../../CustomAccordion/CustomAccordion";
import CartCanvas from "../../../Home/CartCanvas/CartCanvas";
import MainButton from "../../../MainButton/MainButton";
// Styles
import styles from "./Navbar.module.css";
import ListItems from "../../../ListItems/ListItems";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../../redux/slices/cartSlice";
import { triggerCartCanvas } from "../../../../redux/slices/shared/sharedSlice";

function generateId() {
  return Math.random().toString(32).slice(2);
}

const categories = [
  {
    id: generateId(),
    title: "All Categories",
    titleAR: "جميع الفئات",
    firstSub: [
      { id: generateId(), title: "Fresh Fruits", titleAR: "الفواكه" },
      {
        id: generateId(),
        title: "Meat & Poultry",
        titleAR: "اللحوم و الاسماك",
      },
      { id: generateId(), title: "Grocery", titleAR: "البقالة" },
      { id: generateId(), title: "Beauty & Health", titleAR: "الصحة و الجمال" },
      {
        id: generateId(),
        title: "Home Decor",
        titleAR: "اكسسوارات المنزل",
        subCategories: [
          { id: generateId(), title: "clocks", titleAR: "الساعات" },
          { id: generateId(), title: "lighting", titleAR: "الاضاءة" },
          { id: generateId(), title: "vases", titleAR: "الفازات" },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Fresh Fruits",
    titleAR: "الفواكه",
    firstSub: [
      { id: generateId(), title: "Fresh Fruits", titleAR: "الفواكه" },
      {
        id: generateId(),
        title: "Meat & Poultry",
        titleAR: "اللحوم و الاسماك",
      },
      { id: generateId(), title: "Grocery", titleAR: "البقالة" },
      { id: generateId(), title: "Beauty & Health", titleAR: "الصحة و الجمال" },
    ],
  },
  {
    id: generateId(),
    title: "Grocery",
    titleAR: "البقالة",
    firstSub: [
      { id: generateId(), title: "Fresh Fruits", titleAR: "الفواكه" },
      {
        id: generateId(),
        title: "Meat & Poultry",
        titleAR: "اللحوم و الاسماك",
      },
      { id: generateId(), title: "Grocery", titleAR: "البقالة" },
      { id: generateId(), title: "Beauty & Health", titleAR: "الصحة و الجمال" },
      {
        id: generateId(),
        title: "Home Decor",
        titleAR: "اكسسوارات المنزل",
        subCategories: [
          { id: generateId(), title: "clocks", titleAR: "الساعات" },
          { id: generateId(), title: "lighting", titleAR: "الاضاءة" },
          { id: generateId(), title: "vases", titleAR: "الفازات" },
        ],
      },
    ],
  },
];

const canvasItems = {
  sideNav: false,
  locator: false,
};

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.shared);
  const { showCartCanvas } = useSelector((state) => state.shared);
  const dispatch = useDispatch();

  const [canvasShow, setCanvasShow] = useState(canvasItems);

  const handleShowCanvas = (choice) => {
    setCanvasShow((prev) => ({
      ...prev,
      [choice]: !prev[choice],
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(getCart(JSON.parse(localStorage.getItem("cart"))));
    }
  }, [dispatch]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className="container d-flex flex-wrap g1">
          <NavbarBrand handleShowCanvas={handleShowCanvas} />
          <NavbarSearch />
          <NavbarOptions
            handleShowCanvas={() => dispatch(triggerCartCanvas())}
            count={cart?.length ? cart.length : "0"}
          />
        </div>
      </nav>

      {/* SideBar Canvas */}
      <CustomOffcanvas
        show={canvasShow.sideNav}
        handleClose={() => handleShowCanvas("sideNav")}
        title={lang === "en" ? "Hello, User" : "مرحبا محمد"}
        placement={lang === "en" ? "start" : "end"}
      >
        <CustomAccordion flush>
          {categories?.map((cat) => (
            <AccordionItem
              key={cat.id}
              eventKey={cat.id}
              header={lang === "en" ? cat.title : cat.titleAR}
              iconPosition="end"
            >
              <ListItems categories={cat.firstSub} />
            </AccordionItem>
          ))}
        </CustomAccordion>
      </CustomOffcanvas>
      {/* Location Modal */}
      <CustomModal
        show={canvasShow.locator}
        title={lang === "en" ? "Add New Address" : "اضافة عنوان جديد"}
        handleClose={() => handleShowCanvas("locator")}
        centered
        aria-labelledby="Add New Address"
      >
        <div className={styles.locator}>
          <input type="text" placeholder="Search Location" />
          {/* The div element for the map */}
          <div className={styles.map}></div>
          <hr />
          <div className="d-flex align-items-center justify-content-end">
            <MainButton
              text={lang === "en" ? "confirm location" : "تأكيد العنوان"}
              bg="alt-outline"
            />
          </div>
        </div>
      </CustomModal>
      {/* Cart Canvas */}
      <CartCanvas
        show={showCartCanvas}
        handleClose={() => dispatch(triggerCartCanvas())}
        placement={lang === "en" ? "end" : "start"}
        cart={cart}
      />
    </>
  );
};

export default Navbar;
