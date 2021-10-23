import { useTranslations } from 'use-intl';
import { useRouter } from 'next/dist/client/router';
import { useForm } from "react-hook-form";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useState } from 'react';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RequiredMark = () => (<span className="font-bold text-red-400 ml-1">*</span>);
const ContactForm = () => {

    const t = useTranslations('contactForm');
    const fv = useTranslations('formSubmissionSuccess');

    const { locale } = useRouter();
    const [apiResponse, setApiResponse] = useState(undefined);

    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: { isDirty, isValid, errors, isSubmitting },
        reset
    } = useForm({ mode: "onChange" });

    const onSubmit = async data => {
        const res = await axios.post("/api/forms/contact", data);
        setApiResponse(res.data);
        reset();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            {apiResponse ? (apiResponse.success ? (
                <div class="alert alert-info my-8">
                    <div class="flex-1">
                        <FontAwesomeIcon icon={faInfoCircle} size="1x" className='mr-2' />
                        <label>{fv('completed', {ref: apiResponse.sessionId})}</label>
                    </div>
                </div>
            ) : (
                <div class="alert alert-error my-8">
                    <div class="flex-1">
                        <FontAwesomeIcon icon={faInfoCircle} size="lg" className='mr-2' />
                        <label>{fv('failed', {err: apiResponse.error})}</label>
                    </div>
                </div>
            )) : []}
            <div className={`card shadow-lg w-auto`}>
                <div className="card-body bg-gray-50">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('name')}<RequiredMark /></span>
                            </label>
                            <input {...register("name", { required: true })} 
                                placeholder={t('name_placeholder')} 
                                className={`input ${errors.name ? "input-error" : ""}`} />
                            {errors.name ? (<label class="label">
                                <span class="label-text-alt">{fv('requiredField')}</span>
                            </label>) : []}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('email')}<RequiredMark /></span>
                            </label>
                            <input {...register("email", { required: true, pattern: EMAIL_REGEX })} 
                                placeholder={t('email_placeholder')} 
                                className={`input ${errors.email ? "input-error" : ""}`} />
                            {errors.email ? (<label class="label">
                                <span class="label-text-alt">{fv('notValidEmail')}</span>
                            </label>) : []}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('message')}<RequiredMark /></span>
                            </label>
                            <textarea {...register("message", { required: true })} 
                                className={`textarea h-24 textarea-bordered ${errors.message ? "input-error" : ""}`} 
                                placeholder={t('message_placeholder')} />
                            {errors.message ? (<label class="label">
                                <span class="label-text-alt">{fv('requiredField')}</span>
                            </label>) : []}
                        </div>
                        <br />
                        <HCaptcha required {...register("h-captcha-response", { required: true })} 
                            onVerify={(v) => { setValue("h-captcha-response", v, { shouldValidate: true }) }} 
                            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} 
                            languageOverride={locale} />
                        <div className="form-control pt-8">
                            <button type="submit" className="btn" disabled={!isDirty || !isValid}>
                                {!isSubmitting ? t('submit') : (
                                    <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2x" />
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;