import { useTranslations } from 'use-intl';
import { useRouter } from 'next/dist/client/router';
import { useForm } from "react-hook-form";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useState, useRef } from 'react';
import { EMAIL_REGEX, NUMBER_REGEX } from '../../utils/constants';
import RequiredMark from './RequiredMark';

const SubmissionForm = () => {

    const t = useTranslations('submitForm');
    const fv = useTranslations('formSubmissionSuccess');

    const { locale } = useRouter();
    const [apiResponse, setApiResponse] = useState(undefined);

    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: { errors, isSubmitting },
        reset,
        watch
    } = useForm({ mode: "onChange" });
    const validConsent = watch("consent", false);
    const captcha = useRef();

    const onSubmit = async rawData => {
        var data = new FormData();
        data.set("age", rawData.age);
        data.set("gender", rawData.gender);
        data.set("location", rawData.location);
        data.set("dateOfDeath", rawData.dateOfDeath);
        data.set("name", rawData.name);
        data.set("displayName", rawData.displayName);
        data.set("occupation", rawData.occupation);
        data.set("detailText", rawData.detailText);
        data.set("submitterName", rawData.submitterName);
        data.set("submitterEmail", rawData.submitterEmail);
        data.set("submitterPhone", rawData.submitterPhone);
        data.set("submitterPhone", rawData.submitterPhone);
        data.set("photoFile", rawData.photoFile.length ? rawData.photoFile[0] : undefined);
        data.set("proofFile", rawData.proofFile[0]);
        data.set("h-captcha-response", rawData["h-captcha-response"]);
        const res = await axios.post("/api/forms/submission", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        setApiResponse(res.data);
        reset();
        captcha.current.resetCaptcha();
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
                    <div className='prose'>
                        <h3>{t('section_consent_title')}</h3>
                        <ul>
                            <li>{t('section_consent_1')}</li>
                            <li>{t('section_consent_2')}</li>
                            <li>{t('section_consent_3')}</li>
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('consent_checkbox_label')}<RequiredMark/></span>
                                <input {...register("consent", { required: true })}
                                    className={`checkbox ${errors.consent ? "input-error" : ""}`}
                                    type="checkbox"/>
                            </label>
                            {errors.consent ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                            </label>) : []}
                        </div>
                        <div className={`form-control ${!validConsent ? "hidden": ""}`}>
                            <hr/>
                            <div className='prose pb-4'>
                                <h3>{t('section_details_title')}</h3>
                                <p>{t('section_details_text')}</p>
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text">{t('details_age_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("age", { required: true, pattern: NUMBER_REGEX })}
                                    className={`input ${errors.age ? "input-error" : ""}`}
                                    type="number"/>
                                {errors.age ? (<label class="label">
                                    <span class="label-text-alt">{fv('notValidNumber')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('gender_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("gender", { required: true})} 
                                    className={`input ${errors.gender ? "input-error" : ""}`}
                                    type="text"/>
                                {errors.gender ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('location_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("location", { required: true})} 
                                    className={`input ${errors.location ? "input-error" : ""}`}
                                    type="text"/>
                                {errors.location ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('dateOfDeath_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("dateOfDeath", { required: true})}  
                                    className={`input ${errors.dateOfDeath ? "input-error" : ""}`}
                                    type="date"/>
                                {errors.dateOfDeath ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('name_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("name", { required: true})}
                                    className={`input ${errors.name ? "input-error" : ""}`}
                                    type="text"/>
                                {errors.name ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control pt-2">
                                <label className="label">
                                    <span className="label-text">{t('displayName_label')}<RequiredMark/></span>
                                    <input {...register("displayName", { required: false})}
                                        className={`checkbox ${errors.displayName ? "input-error" : ""}`}
                                        type="checkbox"/>
                                </label> 
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('occupation_label')}</span>
                                </label> 
                                <input {...register("occupation", { required: false})}
                                    className={`input ${errors.occupation ? "input-error" : ""}`}
                                    type="text"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('photoFile_label')}</span>
                                </label> 
                                <input {...register("photoFile", { required: false})}
                                    type="file" accept="image/*" className=""/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('detailText_label')}</span>
                                </label> 
                                <textarea {...register("detailText", { required: false})}
                                    className="textarea h-24 textarea-bordered"></textarea>
                            </div>
                            <hr/>
                            <div className='prose pb-4'>
                                <h3>{t('section_verification_title')}</h3>
                                <p>{t('section_verification_text')}</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('proofFile_label')}<RequiredMark/></span>
                                </label> 
                                <div className={errors.proofFile ? "border-2 border-red-500" : ""}>
                                    <input {...register("proofFile", { required: true})}
                                        type="file" accept="image/*,.pdf,.doc,.docx" className=""/>
                                </div>
                                {errors.proofFile ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredFile')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('submitterName_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("submitterName", { required: true})} 
                                    className={`input ${errors.submitterName ? "input-error" : ""}`}
                                    type="text"/>
                                {errors.submitterName ? (<label class="label">
                                    <span class="label-text-alt">{fv('requiredField')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('submitterEmail_label')}<RequiredMark/></span>
                                </label> 
                                <input {...register("submitterEmail", { required: true, pattern: EMAIL_REGEX})} 
                                    className={`input ${errors.submitterEmail ? "input-error" : ""}`}
                                    type="email"/>
                                {errors.submitterEmail ? (<label class="label">
                                    <span class="label-text-alt">{fv('notValidEmail')}</span>
                                </label>) : []}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{t('submitterPhone_label')}</span>
                                </label> 
                                <input {...register("submitterPhone", { required: false})} 
                                    type="text" className="input"/>
                            </div>
                            <br />
                            <div className={errors["h-captcha-response"] ? "border-2 border-red-500" : ""}>
                                <HCaptcha required {...register("h-captcha-response", { required: true })} 
                                    onVerify={(v) => { setValue("h-captcha-response", v, { shouldValidate: true }) }} 
                                    ref={captcha}
                                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} 
                                    languageOverride={locale} />
                            </div>
                        {errors["h-captcha-response"] ? (<label class="label">
                            <span class="label-text-alt">{fv('requiredField')}</span>
                        </label>) : []}
                            <div className="form-control pt-8">
                                <button type="submit" className="btn">
                                    {!isSubmitting ? t('submit') : (
                                        <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2x" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubmissionForm;