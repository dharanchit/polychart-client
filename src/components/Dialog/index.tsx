import { Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';

const DialogBoxWrapper = styled.div`
    .main-div{
        margin: 2em;
    }

    .header-text{
        margin-bottom: 1em
    }
`

type Props = {
    documentId: string,
    closeModal: any,
}

const PolicyDialog = ({ documentId, closeModal }: Props) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [policyData, setPolicyData] = useState<any>({});
    const [bodilyInjuryLiability, setBodilyInjuryLiability] = useState<string>("");
    const [customerMaritalStatus, setCustomerMaritalStatus] = useState<string>("");
    const [premium, setPremium] = useState<string>("");
    const [vehicleSegment, setVehicleSegment] = useState<string>("");
    const [collison, setCollision] = useState<string>("");
    const [customerGender, setCustomerGender] = useState<string>("");
    const [updatingDataLoader, setUpdatingDataLoader] = useState<boolean>(false);

    const fetchPolicyData = async (documentId: string) => {
        setLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/policy-data`, {
                params: {
                    docId: documentId
                }
            });
            if (response.status === 200) {
                const { data } = response.data;
                setPolicyData(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchPolicyData(documentId);
    }, [documentId]);

    useEffect(() => {
        if (Object.keys(policyData).length > 0) {
            setBodilyInjuryLiability(policyData.bodilyInjuryLiability);
            setCustomerMaritalStatus(policyData.customerMaritalStatus);
            setPremium(policyData.premium);
            setVehicleSegment(policyData.vehicleSegment);
            setCollision(policyData.collision);
            setCustomerGender(policyData.customerGender);
        }
    }, [policyData])

    const handleUpdate = async () => {
        setUpdatingDataLoader(true);
        try {
            const reqData = {
                objectID: documentId,
                modifiedData: {
                    policyData: {
                        bodilyInjuryLiability,
                        premium,
                        vehicleSegment,
                        collison,
                    },
                    customerData: {
                        customerMaritalStatus,
                        customerGender
                    }
                }
            };
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/`, reqData);
            if (response.status === 200) {
                closeModal();
            }
        } catch (err) {
            alert('Failed to update the information');
        }
        setUpdatingDataLoader(false);
    }

    return (
        <DialogBoxWrapper>
        <div className="main-div">
            <Typography variant="h4" className="header-text"> Policy Details </Typography>
            {loader && (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            )}
            {!loader && (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                            <TextField label="Policy Id" variant="outlined" defaultValue={policyData.policyId} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Body Injury Liability" variant="outlined" defaultValue={policyData.bodilyInjuryLiability} onChange={(e: any) => setBodilyInjuryLiability(e.target.value)} error={!["1", "0"].includes(bodilyInjuryLiability)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Date Of purchase" variant="outlined" defaultValue={policyData.dateOfPurchase} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Id" variant="outlined" defaultValue={policyData.customerId} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Maritial Status" variant="outlined" defaultValue={policyData.customerMaritalStatus} onChange={(e: any) => setCustomerMaritalStatus(e.target.value)} error={!["1", "0"].includes(customerMaritalStatus)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Premium" variant="outlined" defaultValue={policyData.premium} onChange={(e: any) => setPremium(e.target.value)} error={premium.length > 1000000} helperText={"It can not be more than 1 Million"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Vehicle Segment" variant="outlined" defaultValue={policyData.vehicleSegment} onChange={(e: any) => setVehicleSegment(e.target.value)} error={!["A", "B", "C"].includes(vehicleSegment)} helperText={"Wrong vehicle Segment"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Collision" variant="outlined" defaultValue={policyData.collision} onChange={(e: any) => setCollision(e.target.value)} error={!["1", "0"].includes(collison)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Gender" variant="outlined" defaultValue={policyData.customerGender} onChange={(e: any) => setCustomerGender(e.target.value)} error={!["male", "female"].includes(customerGender.toLowerCase())} helperText={"It can be either M or F"} />
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <Button variant="contained" color="primary" onClick={() => handleUpdate()}> {updatingDataLoader ? <CircularProgress color="secondary" /> : "Update"} </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
        </DialogBoxWrapper>
    );
};

export default PolicyDialog;