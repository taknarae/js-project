import React from 'react';


import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const RecipeDetail = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;

  const {id} = useParams();
  const [menu,setMenu] = useState([]); //([]) **중요
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    axios.get(`https://openapi.foodsafetykorea.go.kr/api/${APIKEY}/COOKRCP01/json/1/20`)
    .then((res)=>{
      const foundMenu = res.data.COOKRCP01.row.find(el => String(el.RCP_SEQ) === String(id));
      console.log("foundMenu==",foundMenu);
      setMenu(foundMenu);
      setLoading(false);
    })
    .catch((err)=>{ console.log(err) })
  },[]);
  return (
    <>
      <div className="p-detail">
        <div className="layout-fix">
          { loading ? (<div className="loading">로딩중</div>) : (
            <>
              <div className="info">
                <div className="thumb-group">
                  <img src={menu.ATT_FILE_NO_MK} alt={menu.RCP_NM}/>
                  <ul className="thumb-list">
                    {Object.keys(menu)
                      .filter((key)=> key.startsWith("MANUAL_IMG") && menu[key])
                      .sort((a, b) => parseInt(a.slice(-2)) - parseInt(b.slice(-2))) // (-2는 문자열에서 마지막 두 자리를 기준으로 정렬)
                      .map((key,idx)=> ( <li key={idx}><img src={menu[key]} alt=""/></li> ))
                    }
                  </ul>
                </div>
                <div className="txt">
                  <span className="badge">{menu.RCP_PAT2}</span>
                  <h2 className="heading-tit">{menu.RCP_NM}</h2>
                  <p className="tip">{menu.RCP_NA_TIP}</p>

                  <ul className="option-list">
                    {menu.INFO_WGT && <li>중량(1인분) <b>{menu.INFO_WGT}</b></li>}
                    {menu.INFO_ENG && <li>열량 <b>{menu.INFO_ENG}</b></li>}
                    {menu.INFO_CAR && <li>탄수화물 <b>{menu.INFO_CAR}</b></li>}
                    {menu.INFO_PRO && <li>단백질 <b>{menu.INFO_PRO}</b></li>}
                    {menu.INFO_FAT && <li>지방 <b>{menu.INFO_FAT}</b></li>}
                    {menu.INFO_NA && <li>나트륨 <b>{menu.INFO_NA}</b></li>}
                  </ul>
                  <div className="parts">{menu.RCP_PARTS_DTLS}</div>
                  <ul className="idx-list">
                    {Object.keys(menu)
                      .filter((key)=> key.startsWith("MANUAL") && !key.startsWith("MANUAL_IMG") && menu[key])
                      .sort((a, b) => parseInt(a.slice(-2)) - parseInt(b.slice(-2)))
                      .map((key,idx)=> ( <li key={idx}>{menu[key]}</li> ))
                    }
                  </ul>
                </div>
              </div>
            </>
          ) }
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;