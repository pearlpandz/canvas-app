import { useCallback } from 'react';
import './Frame.css'

const Frame = (props) => {
    const { companyDetails, selectedImg, selectedFrame } = props;
    const { companyName, mobileNumber1, mobileNumber2, logo, email, website, description } = companyDetails;
    const getContainerStyle = useCallback(() => {
        return {
            ...selectedFrame.container,
            overflow: "hidden",
            border: "1px solid #d0d0d0",
            position: "relative"
        }
    }, [selectedFrame])

    const getTitleContainerStyle = () => {
        return {
            ...selectedFrame.titleContainer,
        }
    }

    const getTitleStyle = () => {
        return {
            ...selectedFrame.title
        }
    }

    const getLogoContainerStyle = () => {
        return {
            ...selectedFrame.logoContainer,
            overflow: "hidden",
            position: "absolute",
        }
    }
    const getLogoStyle = () => {
        return {
            objectFit: "contain"
        }
    }
    const getBannerContainerStyle = () => {
        return {
            ...selectedFrame.bannerContainer,
            position: "absolute",
            zIndex: 1
        }
    }
    const getBannerStyle = () => {
        return {
            ...selectedFrame.banner,
            width: "100%",
            objectFit: "cover",
            height: "100%",
        }
    }
    const getContactContainerStyle = () => {
        return {
            ...selectedFrame.contactContainer,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }
    const getContactStyle = () => {
        return {
            ...selectedFrame.contact,
        }
    }
    const getDescriptionContainerStyle = () => {
        return {
            ...selectedFrame.descriptionContainer,
            position: "absolute",
        }
    }
    const getDescriptionStyle = () => {
        return {
            ...selectedFrame.descriptionContent
        }
    }

    return (
        <div style={getContainerStyle()}>
            <div style={getTitleContainerStyle()}>
                <h3 style={getTitleStyle()}>{companyName}</h3>
            </div>
            <div style={getLogoContainerStyle()}>
                <img style={getLogoStyle()} src={logo} width={'100%'} height={'100%'} />
            </div>
            <div style={getBannerContainerStyle()}>
                <img style={getBannerStyle()} src={selectedImg} alt="Example" />
            </div>
            <div style={getContactContainerStyle()}>
                <p style={getContactStyle()}>{`${mobileNumber1} | ${mobileNumber2} | ${email} | ${website}`}</p>
            </div>
            <div style={getDescriptionContainerStyle()}>
                <p style={getDescriptionStyle()}>{description}</p>
            </div>
        </div>
    );
};


export default Frame;