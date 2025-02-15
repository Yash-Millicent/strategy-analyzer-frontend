import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import cancel from "../../../assets/cancel.svg";
import { Col, Row } from "react-bootstrap";
import {
  IFilterModalProps,
  TSelectedData,
  TSelectedDataKey,
} from "../../../../app/modules/auth";
import DropDownNew, { OptionType } from "../dropDown/DropDownNew";

const FilterModal: React.FC<IFilterModalProps> = ({
  showModal,
  setShowModal,
  selectedFilterData,
  filterData,
  handleFilterSave,
  // onClearDropdown,
}) => {
  const [selectedData, setSelectedData] =
    useState<TSelectedData>(selectedFilterData);

  // on change handler for dropdown
  const handleFilterChange = (key: string, data: TSelectedDataKey) => {
    setSelectedData((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  //clear single drop down
  const handleClearDropdown = (key: string) => {
    setSelectedData((prev) => ({
      ...prev,
      [key]: { value: null, label: null },
    }));
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-8">
          <div className="new-pie-chart-header">Filter</div>
          <img
            src={cancel}
            alt="cancel"
            className="filtermodal-img cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>

        <Row className="mb-5">
          <Col
            md={3}
            className="d-flex align-items-center"
          >
            <div className="dropdown-label">Strategy Type</div>
          </Col>
          <Col className="d-flex align-items-center gap-4">
            <DropDownNew
              option={filterData?.strategy_type}
              onChange={(value) => handleFilterChange("strategy_type", value)}
              value={selectedData?.strategy_type}
              flag="strategy"
            />
            <div
              className="cursor-pointer"
              onClick={() => handleClearDropdown("strategy_type")}
            >
              <i className="bi bi-x-lg"></i>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col
            md={3}
            className="d-flex align-items-center"
          >
            <div className="dropdown-label">Scrip</div>
          </Col>
          <Col className="d-flex align-items-center gap-4">
            <DropDownNew
              option={filterData?.script}
              onChange={(value) => handleFilterChange("script", value)}
              value={selectedData?.script}
              flag="script"
            />
            <div
              className="cursor-pointer"
              onClick={() => handleClearDropdown("script")}
            >
              <i className="bi bi-x-lg"></i>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col
            md={3}
            className="d-flex align-items-center"
          >
            <div className="dropdown-label">Action</div>
          </Col>
          <Col className="d-flex align-items-center gap-4">
            <DropDownNew
              option={filterData?.action}
              onChange={(value) => handleFilterChange("action", value)}
              value={selectedData?.action}
              flag="action"
            />
            <div
              className="cursor-pointer"
              onClick={() => handleClearDropdown("action")}
            >
              <i className="bi bi-x-lg"></i>
            </div>
          </Col>
        </Row>

        <Row>
          <Col
            md={3}
            className="d-flex align-items-center"
          >
            <div className="dropdown-label">Day</div>
          </Col>
          <Col className="d-flex align-items-center gap-4">
            <DropDownNew
              option={filterData?.day}
              onChange={(value) => handleFilterChange("day", value)}
              value={selectedData?.day}
              flag="day"
            />
            <div
              className="cursor-pointer"
              onClick={() => handleClearDropdown("day")}
            >
              <i className="bi bi-x-lg"></i>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex w-100 gap-4">
          <Button
            onClick={() => {
              setSelectedData({
                strategy_type: { value: null, label: null },
                script: { value: null, label: null },
                action: { value: null, label: null },
                day: { value: null, label: null },
              });
              setShowModal(false);
            }}
            className="w-100"
            bsPrefix="cancel-btn"
            id="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleFilterSave(selectedData);
              setSelectedData({
                strategy_type: { value: null, label: null },
                script: { value: null, label: null },
                action: { value: null, label: null },
                day: { value: null, label: null },
              });
              setShowModal(false);
            }}
            className="w-100"
            bsPrefix="save-btn"
            id="save-btn"
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
