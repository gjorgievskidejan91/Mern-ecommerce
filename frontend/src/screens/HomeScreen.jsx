import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Pagination";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-2">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm="12" md="6" lg="4" xl="3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Paginate
              page={data.page}
              pages={data.pages}
              keyword={keyword ? keyword : ""}
            />
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
