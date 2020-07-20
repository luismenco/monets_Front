import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProductService from "services/ProductService";
import { element } from "prop-types";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const classes = makeStyles(styles);

export default class ProductsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    await this.load();
  }
  async load() {
    var result = await ProductService.getAll()
    console.log(result.data);
    let products = [];
    result.data.forEach(element => {
      let items = [element.name, element.stock, element.brand, element.size, element.description];
      products.push(items);
    }
    );

    var result2 = [
      ["yd rating sunscreen tinted 30spf", "20", "Cerave", "50ml", "Protector mineral con proteccion uva/uvB dioxido de titanio"],
      ["Ni acinamide + Zinc 10%", "10", "The Ordinary", "30ml", "Promueve una piel suave y uniforme"],
      ["Hydrating sunscreen tinted 30spf", "20", "Cerave", "50ml", "Protector mineral con proteccion uva/uvB dioxido de titanio"],
      ["Niacinamide + Zinc 10%", "10", "The Ordinary", "30ml", "Promueve una piel suave y uniforme"],
      ["Hydrating sunscreen tinted 30spf", "20", "Cerave", "50ml", "Protector mineral con proteccion uva/uvB dioxido de titanio"],
      ["Niacinamide + Zinc 10%", "10", "The Ordinary", "30ml", "Promueve una piel suave y uniforme"],
      ["Hydrating sunscreen tinted 30spf", "20", "Cerave", "50ml", "Protector mineral con proteccion uva/uvB dioxido de titanio"],
      ["Niacinamide + Zinc 10%", "10", "The Ordinary", "30ml", "Promueve una piel suave y uniforme"]
    ];
    this.setState({ data: products });
  }
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Products List</h4>
              <p className={classes.cardCategoryWhite}>
                Products Information
            </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "stock", "Brand", "Size", , "Description"]}
                tableData={this.state.data}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
