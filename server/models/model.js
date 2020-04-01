const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegexChecker = (val) => {
    if (/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)) {
        return true
    } else {
        return false
    }
}

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name can not be blank."]
        },
        lastName: {
            type: String,
            required: [true, "Last Name can not be blank."]
        },
        email: {
            type: String,
            required: [true, "An email address is required."],
            validate: [emailRegexChecker, "Please enter a valid email address."]
        },
        password: {
            type: String,
            required: [true, "A password is required"],
            minlength: [8, "Password must be at least 8 characters long"]
        },
        entries: [
            {
                title: {
                    type: String,
                    required: [3, 'Title is required and must be at least 3 characteres long.']
                },
                content: {
                    type: String,
                    required: [10, 'Content is required and must be at least 10 characters long.']
                },
                url: {
                    type: String,
                },
                keywords: {
                    type: String
                }, 
                entryDate:{
                    type: Date,
                    default: new Date()
                }
            }
        ]
    }, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value),

    UserSchema.pre('validate', function (next) {
        if (this.password !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
    }),
    UserSchema.pre('save', function (next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    }),

mongoose.model('User', UserSchema);