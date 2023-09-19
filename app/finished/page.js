'use client'
export default function Finished() {
    return(
        <div className="inputWrapper" style={{justifyContent: "center", alignItems: "center", backgroundColor: 'white',  width:'100%', padding:'0'}}>  
            <h1>업로드 완료!!!</h1>
            <p onClick={()=>window.close()} style={{fontSize:'1.2rem'}}>무사히 사진이 제출되었습니다^^</p>
        </div>
    )
}