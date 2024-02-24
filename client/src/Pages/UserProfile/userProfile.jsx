import React from 'react'
import "./userProfile.css"
import image from "../../assets/google_logo.jpg"

function userProfile() {
    return (
        <div className='user_Profile'>
            <h1>Account</h1>

            <div className='title_one'>
                <img src={image} alt="" />
                <h4>NAME</h4>
            </div>

            <div className='details'>
                <div className='account_Details'>

                    <p>Account Datails</p>
                    <div className='row_one'>
                        mail.com
                    </div>
                    <div className='row_two'>
                        password
                    </div>
                    <div className='row_final log_out'>
                    <button>log out</button>
                    </div>

                </div>
                <div className='account_Details'>

                    <p>Subscription</p>
                    <div className='row_final'>
                        Premium (Annual)
                    </div>


                </div>
                <div className='account_Details'>

                    <p>SETTINGS</p>
                    <div className='row_one'>
                        To manage parental controls for profiles on your account, visit Edit Profiles and select a Profile.
                    </div>
                    <div className='row_final'>
                        <button>Delete Account</button>
                    </div>


                </div>






            </div>
        </div>
    )
}

export default userProfile
