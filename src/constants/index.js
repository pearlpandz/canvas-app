export const FRAMES = [
    {
        name: 'Frame 1',
        image: '/assets/frames/frame1.webp',
        css: {
            container: {
                background: "white",
                width: 600,
                height: 600,
            },
            titleContainer: {
                position: 'absolute',
                top: 0,
                right: 20,
                width: 250,
                background: 'red',
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
            },
            title: {
                margin: 0,
                padding: 10,
                textAlign: 'center',
                color: "#fff"
            },
            logoContainer: {
                width: "100px",
                height: "100px",
                top: "10px",
                left: "10px",
                border: "5px solid red"
            },
            bannerContainer: {
                width: "340px",
                height: "340px",
                left: "130px",
                top: "130px",
                border: "5px solid #ffffff",
                padding: "10px",
            },
            banner: {
                border: "5px solid red"
            },
            contactContainer: {
                bottom: "0",
                zIndex: 1,
                left: "20px",
                background: "#fff",
                height: "50px",
                width: "calc(600px - 40px)",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
            },
            contact: {
                textAlign: "center"
            },
            descriptionContainer: {
                background: "red",
                bottom: "0px",
                position: "absolute",
                height: "50%",
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "70px",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "100%"
            },
            descriptionContent: {
                textAlign: "center",
                color: "rgb(255, 255, 255)",
                width: "100%"
            }
        }
    },
    {
        name: 'Frame 2',
        image: '/assets/frames/frame2.webp',
        container: {
            background: "white",
            width: 600,
            height: 600,
        },
        titleContainer: {
            position: "absolute",
            bottom: "135px",
            left: "70px",
            width: "460px",
            background: "red",
            zIndex: 3
        },
        title: {
            padding: "5px",
            textAlign: "center",
            color: "rgb(255, 255, 255)"
        },
        logoContainer: {
            width: 75,
            height: 75,
            top: 10,
            left: 10,
            border: "5px solid red",
            zIndex: 2
        },
        bannerContainer: {
            width: 460,
            height: 460,
            left: 70,
            top: 70,
            zIndex: 1,
        },
        banner: {
            border: 0,
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 6px 5px'
        },
        contactContainer: {
            bottom: "85px",
            zIndex: 1,
            left: "70px",
            background: "rgb(255 0 0)",
            height: "50px",
            width: "460px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        contact: {
            textAlign: "center",
            color: "#fff"
        },
        descriptionContainer: {
            bottom: "0",
            position: "absolute",
            left: "0",
            background: "rgb(255, 0, 0)",
            padding: "10px 20px",
            fontSize: "13px",
            width: "100%",
        },
        descriptionContent: {
            textAlign: "center",
            color: "#fff"
        }
    }
]