/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import auth from "./../../utils/auth";
import Zorang from './ZORANGSCOMA.png';
const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText } = props;
  var { routes } = props;
  const userProfile = auth.getUserInfo();
  console.log("User Profile", userProfile);
  if (userProfile.role === "User" || userProfile.role === "user") {
    routes = routes.filter(route => route.adminOnly == false);
  }
  console.log("Routes ", routes);
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        console.log("Prop", prop);
        console.log("Key", key);
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div style={{width:"250px",height:"150px"}} className={classes.logo}>
      <a
        href="/admin"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div style={{width:"250px",height:"150px"}} className={classes.logoImage}>
          {/* <img
            src={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEUAvND/kin////y//+B0dgLtcX///n348Anusi+7fD4kCr//vDx0aQAt8nd/P1QwMvvmUXx0aj0lz7xp131x4///vr8/////PLx///4lDT2lDfl////kSX/+uj6kzD+kiz/+eLM6u100tsArsCR3eT53bTQ+Prx/vn879LvnEz3/PLsqWWv5en89Nup4+dJxNHxuX31ypn78uDqrW745szrvIXtx5tAws/rrWt41d3qn1T35sVmx9Dx0q3t48bS69/AAERYAAAOlUlEQVR4nO2dC1vivBKAIdEirSAWk/SasLsIipcF3XX91O+c//+vTiZpuSiXAm1pODvPo4UWt7w7k0xmkkxr6NildugvULj8JTRf/hKaL38JzZf/S0JiGS6bCMlDw3DZqMPGXddoGW8gJM6/HVGv1zmXv4K6qPt2vW778kUg1Fnx6WzyWQEv5s6K9KxYc5b76U3gLHzEF+qsmJ61p2d5creVX0j4dhDYUYdt0CG77NRTEcnP7MXOZ+sFn9U/QtSjV2c9odWbIzRRomADIbLMJgyiZ0no4WWEhJhPyG0/ulupw8SRGE0oJfI3WCmJTSd829QOnUvXNlIiW0RweI7XEsaIXV+ZLRO0ljCRHmIOignpIYfJNyRGMRyZPJK5i+zzRWvJRSffi878RSu5CLohvfTbY28zocFCP71fJFT+gn7+jAHC9EgNvnn46esvEqpeCJtHSBJA5ee9xWvLrJQtOVdx0WwytP16acmozYkd48RSducQwqChkRFeQejAZev93Dy5/gXaI9QjHm5iRJm1nBDUPexdPndc0+Slx6Qbo0MH4f7pCZ7vb74QQvQURDLmlLFlEPkRl4FpIGNRWx1sLk8FMu4U6WHuYvInYvaZ9GIUiLk/iYII3qqPqrfwF/ovk3+Ai0jdbO6fFZ/uCRf12yhyfzd034E9fHJ6euKBs1xFGBoYH7qTBqPg4wgKH/+0lA7X9DSmjbyFcJ+lxjD1KHbCf05btU2EhkVPgt++/GLaWYTN/tlp7agIfQnYvWbgHqARNn+eSRUeE6Fv16PbazUOIwD4p6blaAgloN9RgKEch42mgJt0aFJfGnTeEbNUwDvT4BFZqYg6DaVBSuMEsJUQ4lWjNrMI+e114tdD2cm0akenQ7d7naacPABs1VpHRcg7k3dHBXoY2mCrVmtl1aEZYxq/8/IAJipDCK/d/HM6s9EMOmQGEEbupKdM1BqF7f5ZbUGOwUqD4DzuJdFE+2PeQo+BUAVN52lwRAcnZ63aselQmqhKRsBQbXDyo/ZZNvY0TqUJuYx3J7FKHloODk8+K9B0Qr/Og7dJDOlROnJw+/vZV0CTrZQL2/fH7zFypJegQ6/dX6JBkwk5pG3GsW6ACH91E8YTSiPlz70e0zPYdPDzdCmgyR7fD56vdV+BaPh4tgLQ1FGbLX/8cawn0GLavv/iBk23Ur8ugvENSqKJsL8a0DhCnh7d8VM6kvHWaNA0Qj8h9CP36in9ht7j8k7USMJkYZcf+OfJ+gOL0fWAhmWiAvXbj7rnsZ7njVMNHk87BPHvznUX00NxuEGDZhFyW/1275SJUo/GdHC/CdAoQiVCA2I0pDQcfF/Xi5pGKGwbOhpfaxDLaMkbfLQ2AlZ+TONPX3FfACEA6lZoNT8282XQ4YHjQ3v2UsDcRPeSOGRIERl5cqydC2ElrNRXy8Yl4LjHRlitBKLNi9PaqtG2aYQ8GapF9qSXrHfqhYNMJmoGoZ0A2u5vQmF9BURL2dpgJsLD52mSoZoIpAaHsDqbkXCw2UtkJTx0Xzq1Udu9kibqUExG2EtN9Dh6GgXIeffqZiR7GMfDeND/SLqY4yAU4BJ9fxJbxKOIQdLwNEsfag4htEPxNnmI9XpR4n3P3AQrTOjz+XeR/fwwXdLc3hJwc09zwPgw2TYV8fEDkZEgpTRGg+8/ciY8oJXqTjQQ/vhG8iE5mBlS2Qa3BKw0ofodueMbh2BY2kwcCbglX4UJ06DClhrEdKS+yg4arDBh2teMHxAaxQ9yoIZ3AtyciTrkmIb79usDtEAKC9XuP3YBrOq8BeyDrdv+21i5CYegMLy/2IWvwlYKQ+3upBfHCHuOhcLHHQErSyh1aHcb6bYzGt7/aGUahVaaUPu/pIcJuAR0ki0hdGcTzUBY4jy+P0/IRfedYMocBdi/2N4PZtZhqRGwrRNPMqqPbl8kGhtaMiQM184t7U1YZjsUgdagEFHnSroJNJRfzlo7O2gYoR5rB/Wo3mkQyDmp7XWPO7nBihJqQBG83kzv397ZTWQlLLEd6rmzuuiMb6QGaewxCzUvto2WtiUsORMlRF34kxtwEh4ZhdlmJvbUYblWyoW4Hd8ke+molzntaw6h9BJXYKJqZyTSgAVbaSmE01iQi/pYdTIAmIsGK0LIU0Rx+1v3ohBNNHeLlrYlLGOlQpAehDTR5L5x2L7IBbACOhRBkJJ2X56kgYbUk71M+yKHNlgJQjGd5Q3kWJtSKACBvbC5p5+vECFXFZ3sul3vvlsIU4jpcbufG+DhCZUIYfO7hvIQzNuwEi9vwlLGND4E9NJEVYEHaaL9ZLFoOT1NGZkoIXgXNKhCCanB/BSYhbAUK/Xv3tVIDTYKhv3d4/lqEspwkN9JE1UG6sh490etlX2Gt+KEyWIZ90WOtT2JyByctwYPlonSi/C0K7y91BvPGCIM2mCurfBQhCLQ6oO0zO21xVR5lZFyE/niZSAsyEoT++S83rm2kkpN2Bss3dZjJmFdT00EgXv5kN7Ja+bo56tACBK45wz1Qg24Z05tZ8JCPf7tJXiJHokZ8x51yinvrvRQozbBZW/aeWsw5SUQFCI5y9MJbkFYmJUK4Y4bziipbuSt3rdkLCHvvPyyqNKgg7z7P3tnDatFKF29Cykn5SUc5s3qdBwLoYCRGoMNIfLHKshNZCTMOROlylOLeuS+MBT2QgJF/9qPRTXBTISF6DByf79PN56FH2qHeWFaLJlQwEjGd1+stKSmN9BrRYsz07J1KGAH/VjGEkNFiAfbLjWsPCEUknmRjp6MdOL+pNA2mIUw7zFNFIwbzEKMqPKUzR1W4uVNmPcMqd2FmoaxShzKTqZ4wJKtNHKfr3tWUr437WSOgNCfPrUguG1Mq1CWBFiqDiP3FuqNKRPF7WY5gCW0Q6E1KLiInhtOslKNtvunBfvBrIT796VCL+YSvtu97rG02FG/mIB+B8K8rJTbnckvxhjFUD27/U+RY+3DENY7E2WgVArUvi0NsBxCX3Yy53FSrtixJGCtsID3IIS+CILz2VMm8NxIrQTQMvbM+IGqN+bpklzeSbbdrWUR5qFD3pk4iOqBDG4XP9YujVCkmz870kQ9rNY54UH/tAQfWA5huhzW7QLgkMHkEm5+nJXh5csh1Kss/OD1+kF2o2CjFm7+KdlEMxDuvGcmUJODfjB+IoTIsegIY69ZWNp3D8L95i0iDk/q0Yl7HEoNVpFwZyuFJwT4z870WUS4eVaqlyieUEow7sH6CnATtH1/gDZYNGEwfnAYIsrR4/tpeeZyu9LC5vHhgRW/nxgsP7CgevH9qqJ/5hK6d5MnJ3lODw0P4SYyEu5qpdGrDCYIRSFxZC/6cTjA3AmT1bD2XVJQrYfYqF1SRqYcQi1pvTEZEcbh4KSANSQ5Em7VDpOFQH5azClGFA8+vlYvrhLhVpkoHqgFv+74OtYPrCMoHKQbsEt2EpkJt7JSW+89u/vF9OPOLAcPSpiZKJEwNVGmH0oHlVYO2skUQ2g/3zDHghr+CrC8jFNJhFE00XVWejQMvcHPWtr+Dgea70oF7k9ilCbu11QvLlNy1SF3QYPq+Yoh8vqVAMyT0JaAsJQSU9kOKe6XnpFZLjkSBp2rJwf2RQ6JDAcfy5uZWC+5EKrpJanBJ/ASDsxNtCtiorWcxjRCyHgQSuIhbwg1//CqGveHkHwyUTzgbxOVrJBDbYsVsSB9Z8mnHUK9sdmfbKo/Xa7kQ8ih1pFUHuCBmzg01bzkQcjdsdIgQSNLDmXy3FqXg+SQp5kCqodjNj+qBZgDIQ/G0zZIcaGLYXeSva2UyzbILF0hAHuD/Ha35iX7EnLVixLYHhkieris6GrZj5D7b1eJiYYyXippHdd2sp/Ht7vv6cxLL6TNCmpwr1GbGwRv03pj0krvKzMUXZA9rNQP7v59IhY8VhEWbe9VrqpA2ZEQsmqi+wusGDHCKA6r5yYS2YlQcBlNRG86r+0hOqSLj2GoFOtuOuSBzzvvD8oJUgTPmTjE/HU22WlNVCDdxO37tHgxPXzad43sZqUujNSkAzQAcEcrVQmLRIG9KptobTfC6HZ8kyxIJ6TSbRBkC0KeuAnReZFuEBapITIatr//qDRg9jEN1+u1hc/tdCgqCYeD74efmVgvWWdI7bTYEX+DzZ8YOyqcKH5j1t6ybTuMdL0xSlVmbd+qjWVIRsJEhSLwxzmWpSxFttKhG3RfZlnDdn/fspSlyDYrFQL/7sZCyQ56pMozGyBbxIc2f323LEuvpaR4j/LMpcpqQqxIiHPpJp0o795Y+sPUo17/oupuIpHVhMlW5Cmh/dog6TkMaV8zADP3NLb9+m5NTTe8/2MIX2sTIQ01YeB338nsbHk7z/aXjCsV3N9QGbYXIjyyUPOfH8dEqLKJty+6ti+JCYK8tjl8ykoJocsJoTeNpQ5F51/YLQFJNcLCCibu14oktIbWakJppW/dS1WDBFaRUA8KixqFCITJvMpSK0XO9bhhWTKYsFTHA8V9ldT0T61VdVFWuqYdIvyfBqwCcpQlW//9uDBOHr21PQ2Y58yIqee1jZNwgeYLIfY+nzFc5selePFosKxvh+AmTBeLzV5/IlQmyggyVeBJPExGenOnFgk9uEQpMlUo5DzZIsEioaq52TRdFqm/xhbNP2eGC15FmPSh3w6zLzI3OT31JIpHlxAqiYEQZLp5sDV9NwVfsrHwy8j184kv4cmy3YmrPjP7+ptuA59Z9OhfvcW3Si3D215aqwmhH5Id0beqzs9nktY6HcqYylOEh/6We8pqQk8/h/5bgYU3S5HVhLrgEW0ehQ7jNRHwt7NTs+VjQ19KB/0TwwWtJyQjDxstobeJUBuwHqSnB8RmBzW2RVbmA1k8WFkPc/fM8M8n71ASHq0kdBBN8nDp3dj8YY5we9AMaHvcTIOSEVWh33z4tEhoIWRu6ITgv4paarv1HMWyGN90WQzgj5FwUf4Smi9/Cc2Xv4Tmy/ET/g+zMF/iPkAA5wAAAABJRU5ErkJggg=="
            }
            alt="logo"
            className={classes.img}
          /> */}
          <img
          style={{width:"170px",height:"80px"}}
            src={Zorang}
            alt="logo"
            className={classes.img}
          />
        </div>
        
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default withStyles(sidebarStyle)(Sidebar);
