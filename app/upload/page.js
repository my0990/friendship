'use client'
// import { connectDB } from '@/utill/database'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import ClassInfo from './components/class.js';
// Import Swiper styles
import "swiper/css";
import Btn from './components/btn.js';
import Clicked from './components/clicked.js';
import imgUpload from '../../public/imgUpload.png';
import Image from 'next/image.js';
import Left from './components/Left.js';
import Right from './components/Right.js';

export default function Upload() {
  // let client = await connectDB;
  // const db = client.db('forum');
  // let result = await db.collection('post').find().toArray();

  const [imgUrl,setImgUrl] = useState('');
  const [classNum,setClassNum] = useState(0);
  const [grade,setGrade] = useState(0);
  const [userName, setUserName] = useState();
  const [fileName,setFileName] = useState('첨부파일');
  const [isLoading,setIsLoading] = useState(false);
  const [isStarted,setisStarted] = useState(true);
  const [className,setClassName] = useState(null);
  const router = useRouter();
  const onSubmit = () => {
    if(!imgBase64){
      alert('사진을 업로드해주세요')
      return null
    }
    setIsLoading(true);
    let body = new FormData()
    body.set('key', '949e5e887d4fb3a5fea229f584afb1c8')
    body.append('image', imgUrl)

    axios.post("https://api.imgbb.com/1/upload?key=949e5e887d4fb3a5fea229f584afb1c8",body)
    .then(r => {
      return fetch('api/post/new', {
      method : 'POST',
      body: JSON.stringify({userinfo: grade + '학년' + classNum + '반' + userName, url: r.data.data.url}),
  }).then((r)=>{

      if(r.status == 200){
          alert('작성완료')
      
          setIsLoading(false)
          r.json().then(()=> router.push('/finished'))
          
        } else {
          alert('error발생 다새 시도하여 주세요')
          r.json().then(()=> router.push('/upload'))
        }
  })})
      
    }
      

  // const onImgUpload  = (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     const base64data = reader.result;
  //     setImgUrl(base64data.replace(/^data:image\/[a-z]+;base64,/, ""));
  //     }}
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	
  const [isInputClicked,setIsInputClicked] = useState(false);
  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
        setImgUrl(base64.replace(/^data:image\/[a-z]+;base64,/, ""));
        console.log(base64.toString());
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
      console.log(event.target.files[0])
    }
    setFileName(event.target.files[0].name)
  }

  const [gradeArr,setGradeArr] = useState([0,0,0,0,0,0])
  const [classArr,setClassArr] = useState([0,0,0,0,0,0,0])
  const gradeClicked = (element, e) => {
    let tmp = [0,0,0,0,0,0];
    tmp[element] = 1;
    setGradeArr(tmp);
    setGrade(element + 1)
  }
  const classClicked = (element, e) => {
    let tmp = [0,0,0,0,0,0,0];
    tmp[element] = 1;
    setClassArr(tmp);
    setClassNum(element + 1)
  }
  setTimeout(()=>{
    setClassName('fadeout');
    setisStarted(false);
  }, 2000)


  return (
    <main>
 {/* <Swiper  className="mySwiper">
        <SwiperSlide>        
          <div className='inputWrapper'>
            <h1>국원초 우정사진 콘테스트</h1>
            <p>친구들과의 즐겁고 재밌는 모습을 사진으로 찍어 보내주세요</p>
            <p>나와 친구들의 재밌는 사진을 아침 방송에서 볼 수 있습니다^^</p>
            <p style={{backgroundColor: 'yellow'}}>*사진은 1인당 1장만 제출가능하며 제출된 사진은 다시 확인할 수 없습니다.</p>
            <Right />
          </div>

          <div className={className}>
            <div className='test' />
            <div className='svgWrapper'>
            <div className="fingerWrapper">  
            <svg id="Swipe-horizontal_1" data-name="Swipe horizontal 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={200}>
                <path class="hand-x" d="M139.93,113.56l-41.12-6.93V76.08a9.25,9.25,0,0,0-9.25-9.25h0a9.25,9.25,0,0,0-9.25,9.25v57.36L71,122.65c-3.61-3.61-8.44-3.89-13.08,0,0,0-7.24,5.84-3.83,9.25l34,34h42.63a9.25,9.25,0,0,0,9.07-7.43l6.82-34.09A9.28,9.28,0,0,0,139.93,113.56Z"/>
                <g class="swipe-horizontal">
                <path class="line-horizontal" d="M70.85,42c19.69-12.46,37,0,37,0"/>
                <polyline class="arrow-left" points="76.6 46.01 68.37 43.43 68.38 43.41 70.96 35.18"/>
                <polyline class="arrow-right" points="100.21 44.66 108.43 42.08 108.43 42.06 105.85 33.84"/>
                </g>
            </svg>
            <div className='slidInfo'>
              슬라이드하여 이동하세요
            </div>
            </div>
            </div>
          </div>


        </SwiperSlide>
        <SwiperSlide>
          <div className='inputWrapper'>
              <h1>학년을 선택해주세요</h1>
              {gradeArr.map((element, index) => (
                element 
                ?  <Clicked key={index}  onClick={(e) => gradeClicked(index,e)}>{index+1}학년</Clicked>
                :  <ClassInfo key={index} onClick={(e) => gradeClicked(index,e)}>{index+1}학년</ClassInfo>
              ))}
              <Left />
              <Right />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='inputWrapper'>
            <h1>학급을 선택해주세요</h1>
            {classArr.map((element, index) => (
              element 
              ?  <Clicked key={index}  onClick={(e) => classClicked(index,e)}>{index+1}반</Clicked>
              :  <ClassInfo key={index} onClick={(e) => classClicked(index,e)}>{index+1}반</ClassInfo>
            ))}
              <Left />
              <Right />
            </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className='inputWrapper'>
            <h1>이름을 입력해주세요</h1>
            <input  className='nameInput' onChange={(e)=>setUserName(e.target.value)} value={userName} style={{textAlign:"center"}} // 클릭될 때 작동
				onFocus={() => {
					setIsInputClicked(true);
				}}

				onBlur={() => {
					setIsInputClicked(false);
				}}

				placeholder={isInputClicked === true ? "" : "예) 홍길동"}></input>
            <Left />
            <Right />
          </div>

        </SwiperSlide>
        <SwiperSlide>
        <div className='inputWrapper'>
          <h1>{`사진을 업로드해주세요`}</h1>
          <div class="filebox">
              <input class="upload-name" value={fileName} placeholder="첨부파일" />
              <label for="file">파일찾기</label> 
              <input type="file" id="file" onChange={handleChangeFile} />
          </div>
          {imgBase64 ? <Image src={imgBase64} className='preview' alt='preview' width={200} height={200} style={{width: "200px" , height: "200px"}}/> : null}
          <button className="class" onClick={onSubmit}>완료</button>
        </div>
        {isLoading ?         <div className="test"></div> : null}
        {isLoading ? 
        <div className="svgWrapper">
        <svg className="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45"/>
        </svg>
        </div> : null}

        </SwiperSlide>
      </Swiper> */}
      <h1>우정사진 제출 기간이 종료되었습니다.</h1>

    </main>
  )
}
