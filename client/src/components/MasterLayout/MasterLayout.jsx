import React, { Fragment, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineBank, AiOutlineDollar, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiFillProduct, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { BsCircle, BsPeople } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri"; 
import { PiKeyReturnFill } from "react-icons/pi";
import { MdReportProblem } from "react-icons/md";
import logo from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/logo2.svg";
import { getUserDetails, removeSessions } from "../../helper/SessionHelper";
import { useState } from "react";

const MasterLayout = (props) => {
    const contentRef = useRef();
    const sideNavRef = useRef();
    const [activeKey, setActiveKey] = useState(null);

    const onLogout = () => {
        removeSessions();
    };

    const MenuBarClickHandler = () => {
        const sideNav = sideNavRef.current;
        const content = contentRef.current;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    // const isSlidebarAccordionActive = () => {
    //     let urlList = [];
    //     slidebarItems.forEach(item => {
    //         if (item.url) {
    //             urlList.push(item.url);
    //         }
    //         if (item.subMenu.length > 0) {
    //             item.subMenu.forEach(subItem => {
    //                 urlList.push(subItem.url);
    //             });
    //         }
    //     });
    //     return urlList.findIndex(url => url === window.location.pathname) !== -1;
    // };

    const slidebarItems = [
        {
            title: "Dashboard",
            icon: <RiDashboardLine className="side-bar-item-icon" />,
            url: "/",
            subMenu: []
        },
        {
            title: "Customer",
            icon: <BsPeople className="side-bar-item-icon" />,
            url: "/Customer",
            subMenu: [
                {
                    title: "New Customer",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/CustomerCreateUpdatePage"
                },
                {
                    title: "Customer List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/CustomerListPage"
                }
            ]
        },
        {
            title: "Expense",
            icon: <AiOutlineBank className="side-bar-item-icon" />,
            url: "/Tasks",
            subMenu: [
                {
                    title: "New Expense Type",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ExpenseTypeCreateUpdatePage"
                },
                {
                    title: "Expense Type List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ExpenseTypeListPage"
                },
                {
                    title: "New Expense",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ExpenseCreateUpdatePage"
                },
                {
                    title: "Expense List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ExpenseListPage"
                }
            ]
        },
        {
            title:"Products",
            icon: <AiFillProduct className="side-bar-item-icon" />,
            url: "/Products",
            subMenu: [
                {
                    title: "New Product",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ProductCreateUpdatePage"
                },
                {
                    title: "Product List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ProductListPage"
                },
                {
                    title:"Brand List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/BrandListPage"
                },
                {
                    title:"Create Brand",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/BrandCreateUpdatePage"
                },
                {
                    title:"Category List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/CategoryListPage"
                },
                {
                    title:"Create Category",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/CategoryCreateUpdatePage"
                }
            ]
        },
        {
            title: "Purchase",
            icon: <AiOutlineDollar className="side-bar-item-icon" />,
            url: "/Purchase",
            subMenu: [
                {
                    title: "New Purchase",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/PurchaseCreateUpdatePage"
                },
                {
                    title: "Purchase List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/PurchaseListPage"
                }
            ]
        },
        {
            title: "Sale",
            icon: <AiOutlineEdit className="side-bar-item-icon" />,
            url: "/Sale",
            subMenu: [
                {
                    title: "New Sale",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/SaleCreateUpdatePage"
                },
                {
                    title: "Sale List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/SaleListPage"
                }
            ]
        },
        {
            title: "Return",
            icon: <PiKeyReturnFill className="side-bar-item-icon" />,
            url: "/Return",
            subMenu: [
                {
                    title: "New Return",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ReturnCreateUpdatePage"
                },
                {
                    title: "Return List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ReturnListPage"
                }
            ]
        },
        {
            title:"Supplier",
            icon: <AiOutlineTeam className="side-bar-item-icon" />,
            url: "/Supplier",
            subMenu: [
                {
                    title: "New Supplier",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/SupplierCreateUpdatePage"
                },
                {
                    title: "Supplier List",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/SupplierListPage"
                }
            ]
        },
        {
            title:"Report",
            icon: <MdReportProblem className="side-bar-item-icon" />,
            url: "/Report",
            subMenu: [
                {
                    title: "Sales Report",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/SalesReport"
                },
                {
                    title: "Purchase Report",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/PurchaseReport"
                },
                {
                    title: "Expense Report",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ExpenseReport"
                },
                {
                    title: "Return Report",
                    icon: <BsCircle size={16} className="side-bar-sub-item-icon" />,
                    url: "/ReturnReport"
                }
            ]
        }

    ];

    return (
        <Fragment>
            <Navbar className="fixed-top px-0 shadow-sm">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <span className="icon-nav m-0 h5" style={{cursor:'pointer'}} onClick={MenuBarClickHandler}>
                            <AiOutlineMenuUnfold />
                        </span>
                        <img className="nav-logo mx-2" src={logo} alt="logo" />
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails().photo} alt="" />
                            <div className="user-dropdown-content">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getUserDetails().photo} alt="" />
                                    <h6>{getUserDetails().firstName}</h6>
                                    <hr className="user-dropdown-divider p-0" />
                                </div>
                                <NavLink to="/profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <button onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={sideNavRef} className="side-nav-open border-radius-0">
                <NavLink to="/" end className="d-flex justify-content-center sticky-top bg-white">
                <img height={100} width={100} style={{ backgroundColor: '#acee43' }} src={logo2} alt="logo" />
                </NavLink>
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)} >
                    {slidebarItems.map((item, index) => {
                        console.log(`Rendering item: ${item.title}`); // Debugging log
                        return item.subMenu.length !== 0 ? (
                            <Accordion.Item eventKey={`${index}`} key={index} className="mt-2">
                                <Accordion.Header>
                                    <div className="side-bar-item">
                                        {item.icon}
                                        <span className="side-bar-item-caption">{item.title}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <NavLink
                                            key={subIndex.toString()}
                                            className={(navData) =>
                                                navData.isActive
                                                    ? "side-bar-item-active side-bar-item"
                                                    : "side-bar-item"
                                            }
                                            to={subItem.url}
                                            end
                                            onClick={() => setActiveKey(`${index}`)}
                                        >
                                            {subItem.icon}
                                            <span className="side-bar-item-caption">{subItem.title}</span>
                                        </NavLink>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ) : (
                            <NavLink
                                key={index}
                                className={(navData) =>
                                    navData.isActive
                                        ? "side-bar-item-active side-bar-item mt-2"
                                        : "side-bar-item"
                                }
                                to={item.url}
                                end
                            >
                                {item.icon}
                                <span className="side-bar-item-caption">{item.title}</span>
                            </NavLink>
                        );
                    })}
                </Accordion>
            </div>

            <div ref={contentRef} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;