import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import { loadBidInfo } from "../../services/requestInfura";
import {
  getTokenSymbolByAddress,
  convertExpiryBlocks,
  trimHexString,
  round2Decimals
} from "../../utils/helpers";
import DisplayLoading from "../common/DisplayLoading";

const AuctionOrderbook = props => {
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const bids = await loadBidInfo(props.bidIds);
    setBook(bids);
  };

  const stageRevokeBid = bidId => {
    props.onModal("revokeBid", { id: bidId }, props.onRemoveBid);
  };

  const toggleButtons = bid => {
    const account = props.account;
    if (account.toLowerCase() === bid.buyer.toLowerCase()) {
      return convertExpiryBlocks(bid.expiry) === "Expired" ? (
        <button
          type="button"
          class="btn btn-outline-dark btn-sm"
          onClick={() => stageRevokeBid(bid.id)}
        >
          Retrieve Tokens
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => stageRevokeBid(bid.id)}
        >
          Cancel
        </button>
      );
    } else if (
      account.toLowerCase() === props.auctioneer.toLowerCase() &&
      convertExpiryBlocks(bid.expiry) !== "Expired" &&
      props.auctionState === 2
    ) {
      return (
        <button type="button" className="btn btn-primary btn-sm">
          Take Offer
        </button>
      );
    }
  };

  const toggleTableContent = () => {
    return book.length === 0 ? (
      <div>Currently there are no offers for this auction.</div>
    ) : (
      <React.Fragment>
        <Table headers={["Bidder", "Offer", "Status", "Action"]}>
          {book.map(bid => (
            <tr key={bid.id}>
              <td>{trimHexString(bid.buyer, 30)}</td>
              <td>
                {round2Decimals(bid.value)} {getTokenSymbolByAddress(bid.token)}
              </td>
              <td>
                {bid.revoked ? "Cancelled" : convertExpiryBlocks(bid.expiry)}
              </td>
              <td>{toggleButtons(bid)}</td>
            </tr>
          ))}
        </Table>
      </React.Fragment>
    );
  };

  useEffect(
    () => {
      fetchBook();
    },
    [props.bidIds]
  );

  return (
    <div className="row">
      <div className="col p-0">
        <h3>Offers</h3>
        {!book ? <DisplayLoading size="large" /> : toggleTableContent()}
      </div>
    </div>
  );
};

export default AuctionOrderbook;
