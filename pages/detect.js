import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';


const Detect = ({name}) => {
    const webcamRef = useRef(null);
    const [net, setNet] = useState(null);
    const [isSitting, setIsSitting] = useState(false);
    const router = useRouter();
    console.log(name)

    useEffect(() => {
        const loadPoseNetModel = async () => {
            const loadedNet = await posenet.load();
            setNet(loadedNet);
        };
        loadPoseNetModel();
    }, []);

    useEffect(() => {
        if (!net || !webcamRef.current) return;

        const intervalId = setInterval(() => {
            detectPose();
        }, 1000); // Adjust interval as needed

        return () => clearInterval(intervalId);
    }, [net]);

    const detectPose = async () => {
        const { keypoints } = await net.estimateSinglePose(webcamRef.current.video);

        // Check if keypoints meet the criteria for sitting position
        const isCurrentSitting = isSittingPosition(keypoints);
        setIsSitting(isCurrentSitting);

        if (isCurrentSitting) {
            
            //Redirecting User 
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        }

    };

    const isSittingPosition = (keypoints) => {
        // Check KeyPoints to match the desired postion
        const leftShoulder = keypoints.find(kp => kp.part === 'leftShoulder');
        const rightShoulder = keypoints.find(kp => kp.part === 'rightShoulder');
        const leftHip = keypoints.find(kp => kp.part === 'leftHip');
        const rightHip = keypoints.find(kp => kp.part === 'rightHip');

        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
            return false; // If keypoint are not align with the desire result
        }

        return leftShoulder.position.y < leftHip.position.y && rightShoulder.position.y < rightHip.position.y;
    };

    return (
        <div className='flex w-full flex-col items-center justify-center pt-16 mx-auto'>
            <h1 className='text-3xl my-4 text-slate-300'>Sitting Position Authenticator</h1>

            <div >
                <div className='border-4 border-zinc-300 w-full rounded-md'>
                    <Webcam
                        ref={webcamRef}
                        width={540}
                        height={380}
                        mirrored={true}
                        screenshotFormat="image/jpeg"
                    />
                </div>

                <div className='text-2xl my-4 text-center w-full'>
                    {isSitting ? (
                        <p style={{ color: 'green' }}>You are sitting correctly!</p>
                    ) : (
                        <p style={{ color: 'red' }}>Please adjust your sitting position.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detect;
