import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ProductService from "services/ProductService";

import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


const classes = makeStyles(styles);

const typeSkinsList = [
  "Seca", "Grasa", "Mixta", "Normal"
];
const brandsList = [
  "The Ordinary", "Cerave", "Pixi by Petra", "Carmex", "Thayers", "Freeman", "Frigidaire","Good Molecules", "Aztec Secret", "EOS"
];
export default class ProductsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      size: "",
      ideal: "",
      typeSkin: [],
      stock: 0,
      description: "",
      alert: {
        open: false,
        message: "",
        color: "success"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  resetProduct() {
    this.setState({
      name: "",
      brand: "",
      size: "",
      ideal: "",
      typeSkin: [],
      stock: 0,
      description: ""
    })
  }
  setMessages(open, message, color) {
    this.setState({
      alert: {
        open: open,
        message: message,
        color: color
      }
    })
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      alert: {
        open: false,
        message: "",
        color: "success"
      }
    })
  };
  handleChange(event) {
    debugger;
    let property = event.target.id
    this.setState({
      [property]: event.target.value
    })
  }
  handleChangeSelect(event) {
    let property = event.target.name
    this.setState({
      [property]: event.target.value
    })
  }
  save() {

    var data = {
      name: this.state.name,
      brand: this.state.brand,
      size: this.state.size,
      ideal: this.state.ideal,
      typeSkin: this.state.typeSkin,
      stock: this.state.stock,
      description: this.state.description,
    };
    if (data.name === "" || data.brand === "" || data.size === "" || data.ideal === "" || data.typeSkin.length === 0 || data.stock < 0 || data.stock === "" || data.description === "") {
      this.setMessages(true, "Campos Requeridos", "danger");
      return;
    }
    ProductService.create(data)
      .then(response => {
        this.resetProduct();
        this.setMessages(true, "Se guardo correctamente el producto", "success");
      })
      .catch(e => {
        this.setMessages(true, "Error Guardando - API" + e, "danger");
      });
  }
  /**/
  render() {
    return (
      <div>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Product</h4>
                <p className={classes.cardCategoryWhite}>Complete your Product</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      error={this.state.name === "" ? true : false}
                      labelText="Name"
                      id="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    {/* <CustomInput
                      error={this.state.brand === "" ? true : false}
                      labelText="Brand"
                      id="brand"
                      type="text"
                      value={this.state.brand}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                     <CustomSelect
                      labelText="Brand"
                      name="brand"
                      error={this.state.brand.length === 0 ? true : false}
                      value={this.state.brand}
                      dataSource={brandsList}
                      onChange={this.handleChangeSelect}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Size"
                      error={this.state.size === "" ? true : false}
                      id="size"
                      type="text"
                      value={this.state.size}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Ideal For"
                      error={this.state.ideal === "" ? true : false}
                      id="ideal"
                      type="text"
                      value={this.state.ideal}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomSelect
                      labelText="Type Skin"
                      name="typeSkin"
                      error={this.state.typeSkin.length === 0 ? true : false}
                      value={this.state.typeSkin}
                      selectionType="multiple"
                      dataSource={typeSkinsList}
                      onChange={this.handleChangeSelect}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Stock"
                      error={this.state.stock < 0 || this.state.stock === "" ? true : false}
                      id="stock"
                      type="number"
                      value={this.state.stock}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Description"
                      id="description"
                      error={this.state.description === "" ? true : false}
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Snackbar
                      place="tc"
                      color={this.state.alert.color}
                      icon={AddAlert}
                      message={this.state.alert.message}
                      open={this.state.alert.open}
                      closeNotification={this.handleClose}
                      close
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={(e) => this.save()} >Save</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

      </div>
    )
  }
}

// onClick={(e) => this.save("menco")}