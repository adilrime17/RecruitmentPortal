import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Button,
    Col,
    Container,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label, Modal, ModalBody, ModalFooter, ModalHeader,
    Row, Spinner
} from "reactstrap";
import {faSearch, faUpload} from "@fortawesome/free-solid-svg-icons";
import API from "../../util/api";

class EligibilityCheck extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            districts: [],
            locationClasses: [],
            qualifications: [],
            cnicFetched: false,
            loadingDetails: false,
            cnic: "",
            districtId: "",
            locationClassId: "",
            maxQualificationId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            fatherName: "",
            dateOfBirth: "",
            wos: false,
            woa: false,
            dlh: false,
            height: "",
            chest: "",
            weight: "",
            visibleDeformity: false,
            ncse: false,
            savingData: false,
            registration: '',
            status: ''
        };
    }

    componentDidMount() {
        Promise.all([
            API.GetAllDistricts(),
            API.GetAllLocationClasses(),
            API.GetAllQualifications()
        ])
            .then(resp => {
                this.setState({
                    districts: resp[0].data,
                    locationClasses: resp[1].data,
                    qualifications: resp[2].data
                })
            })
    }

    onChangeInput = (event, value) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: value ?? event.target.value
        });
    }

    onChangeCheck = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    getCandidateDetails = () => {
        if(this.state.loadingDetails) return;

        this.setState({
            cnicFetched: false,
            loadingDetails: true
        }, () => {
            API.GetCandidateDetails(this.state.cnic)
                .then(resp => {
                    let today = new Date(resp.data.dateOfBirth);
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    const yyyy = today.getFullYear();

                    today = `${yyyy}-${mm}-${dd}`;
                    this.setState({
                        districtId: resp.data.districtId,
                        locationClassId: resp.data.locationClassId,
                        maxQualificationId: resp.data.maxQualificationId,
                        firstName: resp.data.firstName,
                        middleName: resp.data.middleName,
                        lastName: resp.data.lastName,
                        fatherName: resp.data.fatherName,
                        dateOfBirth: resp.data.dateOfBirth ? today : "",
                        wos: resp.data.wos,
                        woa: resp.data.woa,
                        dlh: resp.data.dlh,
                        height: resp.data.height,
                        chest: resp.data.chest,
                        weight: resp.data.weight,
                        visibleDeformity: resp.data.visibleDeformity,
                        cnicFetched: true,
                        loadingDetails: false
                    });
                });
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        if(!this.state.cnicFetched) {
            this.getCandidateDetails();
            return;
        }

        this.setState({
            savingData: true
        }, () => {
            API.AddCandidate({
                cnic: this.state.cnic,
                districtId: this.state.districtId,
                locationClassId: this.state.locationClassId,
                maxQualificationId: this.state.maxQualificationId,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                fatherName: this.state.fatherName,
                dateOfBirth: this.state.dateOfBirth,
                wos: this.state.wos,
                woa: this.state.woa,
                dlh: this.state.dlh,
                height: this.state.height,
                chest: this.state.chest,
                weight: this.state.weight,
                visibleDeformity: this.state.visibleDeformity,
                ncse: this.state.ncse
            })
                .then(resp => {
                    this.setState({
                        savingData: false,
                        showModal: true,
                        registration: resp.data.registration,
                        status: resp.data.status
                    });
                });
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            cnicFetched: false,
            loadingDetails: false,
            cnic: "",
            districtId: "",
            locationClassId: "",
            maxQualificationId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            fatherName: "",
            dateOfBirth: "",
            wos: false,
            woa: false,
            dlh: false,
            height: "",
            chest: "",
            weight: "",
            visibleDeformity: false,
            ncse: false,
        })
    }

    render() {
        return (
            <Form onSubmit={this.submitForm}>
                <Container fluid>
                    <Row>
                        <Col lg={3}>
                            <Label for={"cnic"}>CNIC</Label>
                            <InputGroup>
                                <Input
                                    type={"text"}
                                    name={"cnic"}
                                    id={"cnic"}
                                    placeholder={"xxxxx-xxxxxxx-x"}
                                    onChange={this.onChangeInput}
                                    required
                                    value={this.state.cnic}
                                    pattern={"(([0-9]{5})(-)([0-9]{7})(-)([0-9])){1}"}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color={"secondary"} type={!this.state.cnicFetched ? "submit" : "button"} onClick={this.state.cnicFetched ? this.getCandidateDetails : null}>
                                        {
                                            this.state.loadingDetails ? (
                                                <Spinner size={"sm"} color={"light"} />
                                            ): (
                                                <>
                                                    <FontAwesomeIcon icon={faSearch} className={"mr-2"} />
                                                    Check
                                                </>
                                            )
                                        }

                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className={`mt-3 ${!this.state.cnicFetched ? 'd-none': ''}`}>
                        <Col lg={3}>
                            <Label for={"firstName"}>First Name</Label>
                            <Input
                                type={"text"}
                                name={"firstName"}
                                id={"firstName"}
                                placeholder={"Enter First Name"}
                                max={250}
                                onChange={this.onChangeInput}
                                required={this.state.cnicFetched}
                                value={this.state.firstName}
                            />
                        </Col>
                        <Col lg={3}>
                            <Label for={"middleName"}>Middle Name</Label>
                            <Input
                                type={"text"}
                                name={"middleName"}
                                id={"middleName"}
                                placeholder={"Enter Middle Name"}
                                max={250}
                                onChange={this.onChangeInput}
                                // required={this.state.cnicFetched}
                                value={this.state.middleName}
                            />
                        </Col>
                        <Col lg={3}>
                            <Label for={"lastName"}>Last Name</Label>
                            <Input
                                type={"text"}
                                name={"lastName"}
                                id={"lastName"}
                                placeholder={"Enter Last Name"}
                                max={250}
                                onChange={this.onChangeInput}
                                value={this.state.lastName}
                            />
                        </Col>
                        <Col lg={3}>
                            <Label for={"dateOfBirth"}>Date of Birth</Label>
                            <Input
                                type={"date"}
                                name={"dateOfBirth"}
                                id={"dateOfBirth"}
                                placeholder={"Enter Date of Birth"}
                                max={250}
                                onChange={this.onChangeInput}
                                required={this.state.cnicFetched}
                                value={this.state.dateOfBirth}
                            />
                        </Col>
                    </Row>
                    <Row className={`mt-3 ${!this.state.cnicFetched ? 'd-none': ''}`}>
                        <Col lg={4}>
                            <Label for={"fatherName"}>Father Name</Label>
                            <Input
                                type={"text"}
                                name={"fatherName"}
                                id={"fatherName"}
                                placeholder={"Enter Father Name"}
                                max={500}
                                onChange={this.onChangeInput}
                                required={this.state.cnicFetched}
                                value={this.state.fatherName}
                            />
                        </Col>
                        <Col lg={4}>
                            <Label for={"districtId"}>District</Label>
                            <Input
                                type="select"
                                name="districtId"
                                id="districtId"
                                onChange={(event) => {
                                    this.onChangeInput(event, parseInt(event.target.value, 10));
                                }}
                                required={this.state.cnicFetched}
                                value={this.state.districtId}
                            >
                                <option value={""} disabled>Select a District</option>
                                {
                                    this.state.districts.map(entry => (
                                        <optgroup key={entry.province} label={entry.province}>
                                            {
                                                entry.districts.map(district => (
                                                    <option value={district.id} key={district.id}>{district.name}</option>
                                                ))
                                            }
                                        </optgroup>
                                    ))
                                }
                            </Input>
                        </Col>
                        <Col lg={4}>
                            <Label for={"locationClassId"}>Class</Label>
                            <Input
                                type="select"
                                name="locationClassId"
                                id="locationClassId"
                                onChange={(event) => {
                                    this.onChangeInput(event, parseInt(event.target.value, 10));
                                }}
                                required={this.state.cnicFetched}
                                value={this.state.locationClassId}
                            >
                                <option value={""} disabled>Select a Class</option>
                                {
                                    this.state.locationClasses.map(locationClass => (
                                        <option value={locationClass.id} key={locationClass.id}>{locationClass.name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                    </Row>
                    <Row className={`mt-3 ${!this.state.cnicFetched ? 'd-none': ''}`}>
                        <Col lg={4}>
                            <Label for={"maxQualificationId"}>Max Qualification</Label>
                            <Input
                                type="select"
                                name="maxQualificationId"
                                id="maxQualificationId"
                                onChange={(event) => {
                                    this.onChangeInput(event, parseInt(event.target.value, 10));
                                }}
                                required={this.state.cnicFetched}
                                value={this.state.maxQualificationId}
                            >
                                <option value={""} disabled>Select Max Qualification</option>
                                {
                                    this.state.qualifications.map(qualification => (
                                        <option value={qualification.id} key={qualification.id}>{qualification.name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                        <Col lg={8}>
                            <Label>Ward Options</Label><br />
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="wos"
                                        id="wos"
                                        onChange={this.onChangeCheck}
                                        checked={this.state.wos}
                                    /> WOS
                                </Label>
                            </FormGroup>
                            <FormGroup check inline className={"ml-3"}>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="woa"
                                        id="woa"
                                        onChange={this.onChangeCheck}
                                        checked={this.state.woa}
                                    /> WOA
                                </Label>
                            </FormGroup>
                            <FormGroup check inline className={"ml-3"}>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="dlh"
                                        id="dlh"
                                        onChange={this.onChangeCheck}
                                        checked={this.state.dlh}
                                    /> DLH
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className={`mt-3 ${!this.state.cnicFetched ? 'd-none': ''}`}>
                        <Col lg={4}>
                            <Label for={"height"}>Height (inches)</Label>
                            <Input
                                type={"number"}
                                name={"height"}
                                id={"height"}
                                placeholder={"Enter Height"}
                                min={0}
                                max={500}
                                step={0.01}
                                onChange={(event) => this.onChangeInput(event, parseFloat(event.target.value, 10))}
                                required={this.state.cnicFetched}
                                value={this.state.height}
                            />
                        </Col>
                        <Col lg={4}>
                            <Label for={"chest"}>Chest (inches)</Label>
                            <Input
                                type={"number"}
                                name={"chest"}
                                id={"chest"}
                                placeholder={"Enter Chest Size"}
                                min={0}
                                max={500}
                                step={0.01}
                                onChange={(event) => this.onChangeInput(event, parseFloat(event.target.value, 10))}
                                required={this.state.cnicFetched}
                                value={this.state.chest}
                            />
                        </Col>
                        <Col lg={4}>
                            <Label for={"weight"}>Weight (inches)</Label>
                            <Input
                                type={"number"}
                                name={"weight"}
                                id={"weight"}
                                placeholder={"Enter Weight"}
                                min={0}
                                max={500}
                                step={0.01}
                                onChange={(event) => this.onChangeInput(event, parseFloat(event.target.value, 10))}
                                required={this.state.cnicFetched}
                                value={this.state.weight}
                            />
                        </Col>
                    </Row>
                    <Row className={`mt-3 ${!this.state.cnicFetched ? 'd-none': ''}`}>
                        <Col lg={4}>
                            <div>
                                <CustomInput
                                    type="switch"
                                    id="visibleDeformity"
                                    name="visibleDeformity"
                                    label="Visible Deformity"
                                    onChange={this.onChangeCheck}
                                    value={this.state.visibleDeformity}
                                />
                            </div>
                        </Col>
                        <Col lg={4} className={"text-center"}>
                            <Button color={"primary"}>
                                <FontAwesomeIcon icon={faUpload} className={"mr-2"}/>
                                Submit
                            </Button>
                        </Col>
                        <Col lg={4} className={"text-right"}>
                            <div>
                                <CustomInput
                                    type="switch"
                                    id="ncse"
                                    name="ncse"
                                    label="Applying as NCsE"
                                    onChange={this.onChangeCheck}
                                    value={this.state.visibleDeformity}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.state.showModal} toggle={this.closeModal} backdrop={"static"} keyboard={true}>
                    <ModalHeader toggle={this.closeModal}>Eligibility Check</ModalHeader>
                    <ModalBody>
                        Registration Number: {this.state.registration}<br />
                        Status: {this.state.status}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.closeModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        );
    }
}

export default EligibilityCheck;
