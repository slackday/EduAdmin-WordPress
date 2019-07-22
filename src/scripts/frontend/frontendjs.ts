/** global: edu */

declare var ShouldValidateCivRegNo: boolean;

interface EduBookingView {
    AddedContactPerson: boolean;
    CurrentParticipants: number;
    DiscountPercent: number;
    ForceContactCivicRegNo: boolean;
    SingleParticipant: boolean;
    MaxParticipants: number;
    ProgrammeBooking: boolean;
    PriceCheckThrottle: any;

    Customer: any | null;
    ContactPerson: any | null;

    Participants: any[] | null;

    AddParticipant: Function;
    CheckParticipantCount: Function;
    CheckNumberOfParticipants: Function;
    CheckPrice: Function;
    CheckValidation: Function;
    ContactAsParticipant: Function;
    RemoveParticipant: Function;
    SelectEvent: Function;
    UpdateInvoiceCustomer: Function;
    UpdatePrice: Function;
    ValidateCivicRegNo: Function;
    ValidateDiscountCode: Function;
}

var eduBookingView: EduBookingView = {
    ProgrammeBooking: false,
    Customer: null,
    ContactPerson: null,
    Participants: [],
    SingleParticipant: false,
    ForceContactCivicRegNo: false,
    MaxParticipants: 0,
    CurrentParticipants: 0,
    DiscountPercent: 0,
    AddParticipant: function () {
        if (!eduBookingView.SingleParticipant) {
            if (
                eduBookingView.MaxParticipants === -1 ||
                eduBookingView.CurrentParticipants <
                eduBookingView.MaxParticipants
            ) {
                let holder = document.getElementById(
                    "edu-participantHolder"
                ) as HTMLDivElement;
                let tmpl = document.querySelector(
                    ".eduadmin .participantItem.template"
                ) as HTMLDivElement;
                let cloned = tmpl.cloneNode(true) as HTMLDivElement;
                cloned.style.display = "block";
                cloned.className = cloned.className.replace(" template", "");

                let requiredFields = cloned.querySelectorAll(
                    "[data-required]"
                ) as NodeListOf<HTMLInputElement>;
                for (let index = 0; index < requiredFields.length; index++) {
                    requiredFields[index].setAttribute("required", "");
                    requiredFields[index].required = true;
                }

                holder.appendChild(cloned);
            } else {
                let partWarning = document.getElementById(
                    "edu-warning-participants"
                );
                if (partWarning) {
                    partWarning.style.display = "block";
                    setTimeout(function () {
                        let partWarning = document.getElementById(
                            "edu-warning-participants"
                        ) as HTMLDivElement;
                        partWarning.style.display = "";
                    }, 5000);
                }
            }
        }
        this.CheckPrice(false);
    },
    RemoveParticipant: function (obj: any) {
        let participantHolder = document.getElementById(
            "edu-participantHolder"
        ) as HTMLElement;
        participantHolder.removeChild(obj.parentNode.parentNode);
        this.CheckPrice(false);
    },
    SelectEvent: function (obj: HTMLSelectElement) {
        let eventid = obj.value;
        if (eventid !== "-1") {
            location.href = "?eid=" + eventid;
        }
    },
    CheckParticipantCount: function () {
        let participants = eduBookingView.SingleParticipant
            ? 1
            : document.querySelectorAll(
            ".eduadmin .participantItem:not(.template):not(.contactPerson)"
        ).length - 1;
        return !(
            participants >= eduBookingView.MaxParticipants &&
            eduBookingView.MaxParticipants >= 0
        );
    },
    CheckNumberOfParticipants: function () {
        return eduBookingView.SingleParticipant
            ? 1
            : document.querySelectorAll(
                ".eduadmin .participantItem:not(.template):not(.contactPerson)"
            ).length;
    },
    UpdatePrice: function () {
        this.CheckPrice(true);
    },
    UpdateInvoiceCustomer: function (checkboxElem: HTMLInputElement) {
        let invoiceView = document.getElementById("invoiceView");
        if (invoiceView) {
            jQuery(invoiceView).slideToggle();
            if (checkboxElem.checked) {
                let customerName = document.querySelector(
                    "input[name='invoiceName']"
                ) as HTMLInputElement;
                customerName.focus();
            }
        }
    },
    ContactAsParticipant: function () {
        let contactParticipant = document.getElementById(
            "contactIsAlsoParticipant"
        ) as HTMLInputElement;
        let contact = 0;
        if (contactParticipant) {
            if (contactParticipant.checked) {
                contact = 1;
            } else {
                contact = 0;
            }
        }
        let contactParticipantItem = document.getElementById(
            "contactPersonParticipant"
        );
        if (contactParticipantItem) {
            contactParticipantItem.style.display =
                contact === 1 ? "block" : "none";

            let cFirstName = (document.getElementById(
                "edu-contactFirstName"
            ) as HTMLInputElement).value;
            let cLastName = (document.getElementById(
                "edu-contactLastName"
            ) as HTMLInputElement).value;
            let cEmail = (document.getElementById(
                "edu-contactEmail"
            ) as HTMLInputElement).value;
            let cPhone = (document.getElementById(
                "edu-contactPhone"
            ) as HTMLInputElement).value;
            let cMobile = (document.getElementById(
                "edu-contactMobile"
            ) as HTMLInputElement).value;

            (document.querySelector(
                ".contactFirstName"
            ) as HTMLInputElement).value = cFirstName;
            (document.querySelector(
                ".contactLastName"
            ) as HTMLInputElement).value = cLastName;
            (document.querySelector(
                ".contactEmail"
            ) as HTMLInputElement).value = cEmail;
            (document.querySelector(
                ".contactPhone"
            ) as HTMLInputElement).value = cPhone;
            (document.querySelector(
                ".contactMobile"
            ) as HTMLInputElement).value = cMobile;
            var tCivReg = document.querySelector(
                ".contactCivReg"
            ) as HTMLInputElement;
            if (tCivReg) {
                (document.getElementById(
                    "edu-contactCivReg"
                ) as HTMLInputElement).required = false;
                if (this.ForceContactCivicRegNo && contact == 1) {
                    tCivReg.required = true;
                    (document.getElementById(
                        "edu-contactCivReg"
                    ) as HTMLInputElement).required = true;
                }
                tCivReg.value = (document.getElementById(
                    "edu-contactCivReg"
                ) as HTMLInputElement).value;
            }

            let requiredFields = contactParticipantItem.querySelectorAll('[data-required]');

            requiredFields.forEach(function (el) {
                let element = el as HTMLInputElement;
                if (contact == 1) {
                    element.required = true;
                } else {
                    element.required = false;
                }
            });

            if (contact == 1 && !this.AddedContactPerson) {
                let freeParticipant = document.querySelector(
                    ".eduadmin .participantItem:not(.template):not(.contactPerson)"
                );
                if (freeParticipant) {
                    let freeFirstName = freeParticipant.querySelector(
                        ".participantFirstName"
                    ) as HTMLInputElement;
                    if (freeFirstName) {
                        if (freeFirstName.value === "") {
                            let removeButton = freeParticipant.querySelector(
                                ".removeParticipant"
                            ) as any;
                            let participantHolder = document.getElementById(
                                "edu-participantHolder"
                            ) as HTMLDivElement;
                            participantHolder.removeChild(
                                removeButton.parentNode.parentNode
                            );
                        }
                    }
                }
                this.AddedContactPerson = true;
            }

        }
        this.CheckPrice(false);
    },
    AddedContactPerson: false,
    ValidateDiscountCode: function () {
        edu.apiclient.CheckCouponCode(
            jQuery("#edu-discountCode").val(),
            jQuery(".validateDiscount").data("eventid"),
            function (data: any) {
                if (data) {
                    eduBookingView.UpdatePrice();
                } else {
                    // Invalid code
                    let codeWarning = document.getElementById(
                        "edu-warning-discount"
                    );
                    if (codeWarning) {
                        codeWarning.style.display = "block";
                        setTimeout(function () {
                            let codeWarning = document.getElementById(
                                "edu-warning-discount"
                            ) as HTMLDivElement;
                            codeWarning.style.display = "";
                        }, 5000);
                    }
                }
            }
        );
    },
    CheckValidation: function (ignoreTerms: boolean) {
        let terms = document.getElementById("confirmTerms") as HTMLInputElement;
        if (terms) {
            if (!ignoreTerms && !terms.checked) {
                let termWarning = document.getElementById("edu-warning-terms");
                if (termWarning) {
                    termWarning.style.display = "block";
                    setTimeout(function () {
                        let termWarning = document.getElementById(
                            "edu-warning-terms"
                        ) as HTMLDivElement;
                        termWarning.style.display = "";
                    }, 5000);
                }
                return false;
            }
        }

        let participants = document.querySelectorAll(
            ".eduadmin .participantItem:not(.template):not(.contactPerson)"
        );

        let requiredFieldsToCreateParticipants = [
            "participantFirstName[]",
            "participantCivReg[]"
        ];

        if (ShouldValidateCivRegNo && !eduBookingView.ValidateCivicRegNo()) {
            return false;
        }

        let contactParticipant = document.getElementById(
            "contactIsAlsoParticipant"
        ) as HTMLInputElement;

        let contact = 0;
        if (contactParticipant) {
            if (contactParticipant.checked) {
                contact = 1;
            } else {
                contact = 0;
            }
        }

        if (eduBookingView.SingleParticipant) {
            contact = 1;
        }

        if (participants.length + contact === 0) {
            let noPartWarning = document.getElementById(
                "edu-warning-no-participants"
            );
            if (noPartWarning) {
                noPartWarning.style.display = "block";
                setTimeout(function () {
                    let noPartWarning = document.getElementById(
                        "edu-warning-no-participants"
                    ) as HTMLDivElement;
                    noPartWarning.style.display = "";
                }, 5000);
            }
            return false;
        }

        for (let i = 0; i < participants.length; i++) {
            let participant = participants[i];
            let fields = participant.querySelectorAll("input");
            for (let f = 0; f < fields.length; f++) {
                if (
                    requiredFieldsToCreateParticipants.indexOf(
                        fields[f].name
                    ) >= 0
                ) {
                    if (fields[f].value.replace(/ /i, "") === "") {
                        /* Show missing participant-name warning */
                        if (fields[f].name === "participantFirstName[]") {
                            let partWarning = document.getElementById(
                                "edu-warning-missing-participants"
                            );
                            if (partWarning) {
                                partWarning.style.display = "block";
                                setTimeout(function () {
                                    let partWarning = document.getElementById(
                                        "edu-warning-missing-participants"
                                    ) as HTMLDivElement;
                                    partWarning.style.display = "";
                                }, 5000);
                            }
                        } else if (fields[f].name === "participantCivReg[]") {
                            let civicWarning = document.getElementById(
                                "edu-warning-missing-civicregno"
                            );
                            if (civicWarning) {
                                civicWarning.style.display = "block";
                                setTimeout(function () {
                                    let civicWarning = document.getElementById(
                                        "edu-warning-missing-civicregno"
                                    ) as HTMLDivElement;
                                    civicWarning.style.display = "";
                                }, 5000);
                            }
                        }
                        return false;
                    }
                }
            }

            let replaceFields = participant.querySelectorAll(
                "[data-replace]"
            ) as NodeListOf<HTMLElement>;
            for (let index = 0; index < replaceFields.length; index++) {
                let replaceItems = (replaceFields[index] as any).attributes[
                    "data-replace"
                    ].value.split(",");
                for (let x = 0; x < replaceItems.length; x++) {
                    let replaceItem = replaceItems[x].split("|");
                    let replaceTemplate = (replaceFields[index] as any)
                        .attributes["data-" + replaceItem[0] + "-template"]
                        .value;
                    (replaceFields as any)[index][
                        replaceItem[0]
                        ] = replaceTemplate.replace(
                        "{{" + replaceItem[1] + "}}",
                        i + 1
                    );
                }
            }
        }

        return true;
    },
    CheckPrice: function (validate: boolean) {
        if (eduBookingView.PriceCheckThrottle) {
            clearTimeout(eduBookingView.PriceCheckThrottle);
        }

        if (eduBookingView.ProgrammeBooking) {
            eduBookingView.PriceCheckThrottle = setTimeout(function () {
                let validation = true;
                if (validate) {
                    validation = eduBookingView.CheckValidation(true);
                }
                if (validation) {
                    let form = jQuery("#edu-booking-form").serialize();
                    form = form.replace(
                        "act=bookProgramme",
                        "act=checkProgrammePrice"
                    );
                    jQuery.ajax({
                        type: "POST",
                        url: "",
                        data: form,
                        success: function (data) {
                            let d = JSON.parse(data);
                            if (d.hasOwnProperty("TotalPriceExVat")) {
                                if (
                                    d["TotalPriceExVat"] === 0 &&
                                    d["TotalPriceIncVat"] === 0
                                ) {
                                    jQuery("#sumValue").text(
                                        numberWithSeparator(
                                            d["TotalPriceExVat"],
                                            " "
                                        ) +
                                        " " +
                                        (window as any).currency
                                    );
                                } else {
                                    if (
                                        d["TotalPriceExVat"] ===
                                        d["TotalPriceIncVat"]
                                    ) {
                                        jQuery("#sumValue").text(
                                            numberWithSeparator(
                                                d["TotalPriceExVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.free
                                        );
                                    } else {
                                        jQuery("#sumValue").text(
                                            numberWithSeparator(
                                                d["TotalPriceExVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.ex +
                                            " (" +
                                            numberWithSeparator(
                                                d["TotalPriceIncVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.inc +
                                            ")"
                                        );
                                    }
                                }
                            }
                            if (d.hasOwnProperty("Message")) {
                            }
                        }
                    });
                }
            }, 100);
        } else {
            eduBookingView.PriceCheckThrottle = setTimeout(function () {
                let validation = true;
                if (validate) {
                    validation = eduBookingView.CheckValidation(true);
                }
                if (validation) {
                    let form = jQuery("#edu-booking-form").serialize();
                    form = form.replace("act=bookCourse", "act=checkPrice");
                    jQuery.ajax({
                        type: "POST",
                        url: "",
                        data: form,
                        success: function (data) {
                            let d = JSON.parse(data);
                            if (d.hasOwnProperty("TotalPriceExVat")) {
                                if (
                                    d["TotalPriceExVat"] === 0 &&
                                    d["TotalPriceIncVat"] === 0
                                ) {
                                    jQuery("#sumValue").text(
                                        numberWithSeparator(
                                            d["TotalPriceExVat"],
                                            " "
                                        ) +
                                        " " +
                                        (window as any).currency
                                    );
                                } else {
                                    if (
                                        d["TotalPriceExVat"] ===
                                        d["TotalPriceIncVat"]
                                    ) {
                                        jQuery("#sumValue").text(
                                            numberWithSeparator(
                                                d["TotalPriceExVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.free
                                        );
                                    } else {
                                        jQuery("#sumValue").text(
                                            numberWithSeparator(
                                                d["TotalPriceExVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.ex +
                                            " (" +
                                            numberWithSeparator(
                                                d["TotalPriceIncVat"],
                                                " "
                                            ) +
                                            " " +
                                            (window as any).currency +
                                            " " +
                                            (window as any).edu_vat.inc +
                                            ")"
                                        );
                                    }
                                }
                            }
                            if (d.hasOwnProperty("Message")) {
                            }
                        }
                    });
                }
            }, 100);
        }
    },
    PriceCheckThrottle: null,
    ValidateCivicRegNo: function () {
        function __isValid(civRegField: HTMLInputElement) {
            let civReg = civRegField.value;
            if (!civReg || civReg.length === 0) {
                return false;
            }

            if (!civReg.match(/^(\d{2,4})-?(\d{2})-?(\d{2})-?(\d{4})$/i)) {
                return false;
            }

            let date = new Date();
            let year = RegExp.$1,
                month = RegExp.$2,
                day = RegExp.$3,
                unique = RegExp.$4;
            if (year.toString().length <= 2) {
                year =
                    date
                        .getFullYear()
                        .toString()
                        .substring(0, 2) +
                    "" +
                    year;
                while (parseInt(year) > date.getFullYear()) {
                    year = (parseInt(year) - 100).toString();
                }
            }

            let checkDate = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day)
            );
            if (
                Object.prototype.toString.call(checkDate) !== "[object Date]" ||
                isNaN(checkDate.getTime())
            ) {
                return false;
            }

            if (month.toString().length === 1) {
                month = "0" + month;
            }

            if (day.toString().length === 1) {
                day = "0" + day;
            }

            let formattedCivReg = year + "" + month + "" + day + "-" + unique;

            civRegField.value = formattedCivReg;
            let cleanCivReg = formattedCivReg.replace(/-/gi, "").substr(2),
                parity = cleanCivReg.length % 2,
                sum = 0;
            for (let i = 0; i < cleanCivReg.length; i++) {
                let d = parseInt(cleanCivReg.charAt(i), 10);
                if (i % 2 === parity) {
                    d *= 2;
                }
                if (d > 9) {
                    d -= 9;
                }
                sum += d;
            }
            return sum % 10 === 0;
        }

        let civicRegNoFields = jQuery(
            "div:not(.template) .eduadmin-civicRegNo[required]"
        );
        for (let i = 0; i < civicRegNoFields.length; i++) {
            let field = civicRegNoFields[i] as HTMLInputElement;
            let p = jQuery(field)
                .parent()
                .parent()
                .parent();
            if (p.hasClass("template")) continue;
            if (!__isValid(field)) {
                field.focus();
                return false;
            }
        }
        return true;
    }
};

function edu_openDatePopup(obj: any) {
    jQuery(".edu-DayPopup.cloned").remove();

    let pos = jQuery(obj.parentElement).offset() as JQuery.Coordinates;
    let width = jQuery(obj).outerWidth() as number;

    let pop = jQuery(obj.nextSibling)
        .clone()
        .appendTo("body");
    pop.addClass("cloned");
    pop.css({
        display: "block",
        opacity: 1,
        top: pos.top + "px",
        left: pos.left + width + 10 + "px"
    });
}

function edu_closeDatePopup(e: Event, obj: any) {
    let pop = jQuery(obj.parentElement);
    pop.remove();

    e.cancelBubble = true;
    e.preventDefault();
}

var eduDetailView = {
    ShowAllEvents: function (filter: string, me: any) {
        me.parentNode.parentNode.removeChild(me.parentNode);
        jQuery('.showMoreHidden[data-groupid="' + filter + '"]')
            .slideDown()
            .css("display", "flex");
    }
};

const eduGlobalMethods = {
    GoBack: function (fallBackUrl: string) {
        if (window.history.length > 1) {
            window.history.go(-1);
            return;
        }
        location.href = fallBackUrl;
    }
};

function numberWithSeparator(x: string, sep: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

let oldonload = window.onload as any;
window.onload = function (ev) {
    if (oldonload) {
        oldonload(ev);
    }
};