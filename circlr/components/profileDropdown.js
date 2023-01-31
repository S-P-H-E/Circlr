import React from "react";

export default function ProfileDropdown(){
    return (
        <div className="flex flex-col profileDropdown">
            <ul className="flex flex-col gap-4">
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}