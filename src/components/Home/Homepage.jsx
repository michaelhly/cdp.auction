import React, { useState } from "react";
import ListingContainer from "./ListingContainer";
import CdpManager from "./CdpManager";
import { paginate } from "../../utils/helpers";
import Pagination from "./Pagination";

const Homepage = props => {
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const paginatedAuctions = paginate(props.auctions, currentPage, pageSize);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <CdpManager />
          </div>
          <div
            className="col-8"
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <div className="row">
              <ListingContainer
                auctions={paginatedAuctions}
                loading={props.loading}
                ethPrice={props.ethPrice}
              />
              <div className="mx-auto">
                <Pagination
                  itemCount={props.auctions.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
