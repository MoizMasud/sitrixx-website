"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Test(
    {
        as: _Component = _Builtin.NavbarWrapper
    }
) {
    return (
        <_Component
            className="navbar-no-shadow-container"
            tag="div"
            config={{
                animation: "default",
                collapse: "medium",
                docHeight: false,
                duration: 400,
                easing: "ease",
                easing2: "ease",
                noScroll: false
            }}><_Builtin.Block className="container-regular" tag="div"><_Builtin.Block className="navbar-wrapper" tag="div"><_Builtin.NavbarBrand
                        className="navbar-brand"
                        options={{
                            href: "#"
                        }} /><_Builtin.NavbarMenu className="nav-menu-wrapper" tag="nav" role="navigation"><_Builtin.List className="nav-menu" tag="ul" unstyled={true}><_Builtin.ListItem><_Builtin.Link
                                    className="nav-link"
                                    button={false}
                                    block=""
                                    options={{
                                        href: "#"
                                    }}>{"About"}</_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.Link
                                    className="nav-link"
                                    button={false}
                                    block=""
                                    options={{
                                        href: "#"
                                    }}>{"Feature"}</_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.Link
                                    className="nav-link"
                                    button={false}
                                    block=""
                                    options={{
                                        href: "#"
                                    }}>{"User Examples"}</_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.Link
                                    className="nav-link"
                                    button={false}
                                    block=""
                                    options={{
                                        href: "#"
                                    }}>{"Pricing"}</_Builtin.Link></_Builtin.ListItem><_Builtin.ListItem><_Builtin.DropdownWrapper className="nav-dropdown" tag="div" delay={0} hover={false}><_Builtin.DropdownToggle className="nav-dropdown-toggle" tag="div"><_Builtin.Icon
                                            className="nav-dropdown-icon"
                                            widget={{
                                                type: "icon",
                                                icon: "dropdown-toggle"
                                            }} /><_Builtin.Block tag="div">{"Resources"}</_Builtin.Block></_Builtin.DropdownToggle><_Builtin.DropdownList className="nav-dropdown-list shadow-three mobile-shadow-hide" tag="nav"><_Builtin.DropdownLink
                                            className="nav-dropdown-link"
                                            options={{
                                                href: "#"
                                            }}>{"Resource Link 1"}</_Builtin.DropdownLink><_Builtin.DropdownLink
                                            className="nav-dropdown-link"
                                            options={{
                                                href: "#"
                                            }}>{"Resource Link 2"}</_Builtin.DropdownLink><_Builtin.DropdownLink
                                            className="nav-dropdown-link"
                                            options={{
                                                href: "#"
                                            }}>{"Resource Link 3"}</_Builtin.DropdownLink></_Builtin.DropdownList></_Builtin.DropdownWrapper></_Builtin.ListItem><_Builtin.ListItem className="mobile-margin-top-10"><_Builtin.Block className="nav-button-wrapper" tag="div"><_Builtin.Link
                                        className="button-primary"
                                        button={true}
                                        block=""
                                        options={{
                                            href: "#"
                                        }}>{"Get Started"}</_Builtin.Link></_Builtin.Block></_Builtin.ListItem></_Builtin.List></_Builtin.NavbarMenu><_Builtin.NavbarButton className="menu-button" tag="div"><_Builtin.Icon
                            widget={{
                                type: "icon",
                                icon: "nav-menu"
                            }} /></_Builtin.NavbarButton></_Builtin.Block></_Builtin.Block></_Component>
    );
}