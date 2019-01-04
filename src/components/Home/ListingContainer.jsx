import React from "react";
import InfoCard from "../common/InfoCard";

const ListingContainer = props => {
  const displayListings = () => {
    if (props.auctions.length === 0) {
      return (
        <h2>
          There are currently no running auctions. Please check back later.
        </h2>
      );
    } else {
      return (
        <React.Fragment>
          <h2 className="title mb-4">Live Auctions</h2>
          {props.auctions
            .filter(auction => {
              return auction.state <= 1;
            })
            .map(auction => (
              <div className="shadow w-100 float-right mb-5 bg-white rounded">
                <InfoCard
                  key={auction.id}
                  auction={auction}
                  type="HOME"
                  loading={props.loading}
                  onSetLoading={props.onSetLoading}
                />
              </div>
            ))}
        </React.Fragment>
      );
    }
  };

  return <React.Fragment>{displayListings()}</React.Fragment>;
};

export default ListingContainer;
