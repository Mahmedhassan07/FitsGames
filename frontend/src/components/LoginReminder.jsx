import { useState } from 'react'
import { X, TriangleAlert } from 'lucide-react'

const REMINDER_IMAGE = '/Thumbnails/AirStrike.jpg' 

function LoginReminder({ onClose }) {
    return (
        <div className="absolute top-full right-0 mt-3 w-80 bg-[#1a1b23] border border-white/10 rounded-2xl shadow-2xl p-4 z-40">
            {/* little arrow pointing up to the button */}
            <div className="absolute -top-2 right-6 w-4 h-4 bg-[#1a1b23] border-t border-l border-white/10 rotate-45"></div>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3">
                <div className="relative shrink-0">
                    <img
                        src={REMINDER_IMAGE}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover"
                    />

                </div>

                <div className="pr-4">
                    <h4 className="text-white font-bold text-sm mb-1">Welcome Back, Gamer!</h4>
                    <p className="text-white/60 text-sm leading-snug">
                        Login to start Playing.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginReminder