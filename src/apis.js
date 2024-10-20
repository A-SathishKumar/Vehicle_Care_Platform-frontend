// const BE_URL = "http://localhost:4500";
import dotenv from'dotenv';
// dotenv.config();
const BE_URL = import.meta.env.VITE_BE_URL;

export const CreateUserAPI = async (userDetails) =>{
    const responce = await fetch(`${BE_URL}/users`,{
        body:JSON.stringify(userDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    return await responce.json();
};

export const loginAPI = async(payload) =>{
    const responce = await fetch(`${BE_URL}/users/login`,{
        body:JSON.stringify(payload),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });

    if(responce.status === 500){
        throw new Error("Something Went Wrong");
    }else if(responce.status === 400){
        throw new Error("Invalid Credentials");
    }
    return await responce.json();
}


//Account Activation

export const AccountActivationAPI = async (token)=>{
    const responce = fetch(`${BE_URL}/users/verify-account?token=${token}`);
    return (await responce).json();
}

export const ActivationSentAPI = async(email)=>{
    const responce = await fetch(`${BE_URL}/users/verify-account/send`,{
        body:JSON.stringify(email),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        return("Something Went Wrong");
    }else if(responce.status === 400){
        return ("Invalid Email");
    }
    return await responce.json();
}

//Forget-Password => Send OTP

export const SendOTPAPI = async (userDetails) =>{
    const responce = await fetch(`${BE_URL}/users/forget-password/send-otp`,{
        body:JSON.stringify(userDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        return("Something Went Wrong");
    }else if(responce.status === 400){
        return ("Invalid Email");
    }
    return await responce.json();
};

//Forget-Password => verify-otp

export const VerifyOTPAPI = async(userDetails)=>{
    const responce = await fetch(`${BE_URL}/users/forget-password/verifyotp`,{
        body:JSON.stringify(userDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        throw new Error("Something Went Wrong");
    }else if(responce.status === 400){
        return("Invalid OTP");
    }
    return await responce.json();
};

//Forget-Password => Reset Password

export const ResetPasswordAPI = async(userDetails)=>{
    const responce = await fetch(`${BE_URL}/users/forget-password/reset-password`,{
        body:JSON.stringify(userDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        throw new Error("Something Went Wrong");
    }else if(responce.status === 400){
        return("Invalid");
    }
    return await responce.json();
}

//Add Car
export const AddCarAPI = async(carDetails)=>{
    const responce = await fetch(`${BE_URL}/users/profile/add-car`,{
        body:JSON.stringify(carDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        throw new Error("Something Went Wrong");
    }else if(responce.status === 400){
        return("Invalid");
    }
    return await responce.json();
}

//Fetch Car
export const FetchCarAPI = async(carDetails)=>{
    const responce = await fetch(`${BE_URL}/users/profile/fetchcars`,{
        body:JSON.stringify(carDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        return("Something Went Wrong");
    }else if(responce.status === 400){
        return("Invalid");
    }
    return await responce.json();
}

//Delete Car From Profile

export const DeleteCarAPI = async(carDetails)=>{
    const responce = await fetch(`${BE_URL}/users/profile/deletecar`,{
        body:JSON.stringify(carDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        return("Something Went Wrong");
    }else if(responce.status === 400){
        return("Invalid");
    }
    return await responce.json();
}



//Fetch Service from DB

export const FetchServiceAPI = async()=>{
    try{
        const responce = await fetch(`${BE_URL}/service/fetch`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(responce.status === 500){
            return("Something Went Wrong, please Try again later");
        }else if(responce.status === 400){
            return("Invalid");
        }
        return await responce.json();
    }catch(e){
        return ("Something Went Wrong, please Try again later");
    }
    
}


//Add the Bookings To BE

export const AddBookingAPI = async(BookingDetails)=>{
    const responce = await fetch(`${BE_URL}/booking/addbooking`,{
        body:JSON.stringify(BookingDetails),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 500){
        return await responce.json();
    }
    return await responce.json();
    
}



//Fetch Bookings Data
export const FetchBookingAPI = async(Email)=>{
    const responce = await fetch(`${BE_URL}/booking/fetchbookings`,{
        body:JSON.stringify(Email),
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(responce.status === 404){
        return await responce.json();
    }
    return await responce.json();
    
}


//Admin - Fetch Users

export const FetchUsersAPI = async()=>{

    try{
        const responce = await fetch(`${BE_URL}/admin/fetchusers`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(responce.status === 500){
            return("Something Went Wrong, please Try again later");
        }else if(responce.status === 400){
            return("Invalid");
        }
        return await responce.json();
    }catch(e){
        return ("Something Went Wrong, please Try again later");
    }
    
}

export const FetchBookingsAPI = async(query)=>{

    try{
        const responce = await fetch(`${BE_URL}/admin/fetchbookings?${query}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(responce.status === 500){
            return("Something Went Wrong, please Try again later");
        }else if(responce.status === 400){
            return("Invalid");
        }
        return await responce.json();
    }catch(e){
        return ("Something Went Wrong, please Try again later");
    }   
}

export const EditStatusAPI = async(id)=>{

    try{
        const responce = await fetch(`${BE_URL}/admin/editstatus`,{
            body:JSON.stringify(id),
            method:"POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(responce.status === 500){
            return("Something Went Wrong, please Try again later");
        }else if(responce.status === 400){
            return("Invalid");
        }
        return await responce.json();
    }catch(e){
        return ("Something Went Wrong, please Try again later");
    }   
}


export const SendNotificationAPI = async(subject,content)=>{

    try{
        const responce = await fetch(`${BE_URL}/admin/notification/send`,{
            body:JSON.stringify(subject,content),
            method:"POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(responce.status === 500){
            return("Something Went Wrong, please Try again later");
        }else if(responce.status === 400){
            return("Invalid");
        }
        return await responce.json();
    }catch(e){
        return ("Something Went Wrong, please Try again later");
    }   
}


export const StripePaymentAPI = async(service)=>{
    await fetch(`${BE_URL}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({items:[{quantity:1,
                            price:service.price,
                            title:service.title,
                            ...service}]}),
      })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
          window.location = url
        })
        .catch(e => {
          console.error(e.error)
        })
}




