import React, { useState, useEffect, useRef } from 'react';
import { Table, Checkbox, Avatar, Row, Col, Button, Input } from 'antd';
import "./contactTable.css";
import AddEditRecord from './addEditRecord';
import LeftPanel from './leftPanel/leftPanel';
import SubHeader from './header/header';

const data = [
  {
    id: '1',
    company: 'company1',
    basicInfo: {
      name: 'Mohit Gupta',
      email: 'mohitgupta@gmail.com'
    },
    mobile: 9878895598,
    address: "Hessargatha, Bengaluru",
  },
  {
    id: '2',
    company: 'company2',
    basicInfo: {
      name: 'Aniket Narayan',
      email: 'aniket@gmail.com'
    },
    mobile: 9889568713,
    address: "Msr Nagar, Bengaluru",
  },
  {
    id: '3',
    company: 'company3',
    basicInfo: {
      name: 'Shubham Shaw',
      email: 'shubhamshaw@gmail.com'
    },
    mobile: 9336987542,
    address: "MahadevPura, Bengaluru",
  },
  {
    id: '4',
    company: 'company4',
    basicInfo: {
      name: 'Anubhav Maji',
      email: 'anubhavmaji@gmail.com'
    },
    mobile: 933856214,
    address: "Marathalli, Bengaluru",
  },
];

const contactTable = () => {
  const [selectedRecord, setSelectedRecord] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const selectedData = useRef(null);
  const columns = [
    {
      title: () => <strong>+</strong>,
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (id) => {
        return <Checkbox checked={selectedIds?.includes(Number(id))} onClick={() => {
          onHandleCheck(id)
        }} />
      },
    },
    {
      title: 'Basic Info',
      dataIndex: 'basicInfo',
      key: 'basicInfo',
      width: 200,
      render: (rowData) => {
        const nameArr = rowData.name?.split(' ');
        return <>
          <div style={{ display: "flex" }}><Avatar style={{ backgroundColor: 'skyblue', verticalAlign: 'middle' }} size="large" gap={1}>
            {nameArr[0]?.charAt(0).toUpperCase() + ' ' + nameArr[1]?.charAt(0).toUpperCase()}
          </Avatar>
            <div >

              <p className='mar-0'>{rowData.name}</p>

              <p>{rowData.email}</p>
            </div>
          </div>
        </>
      }
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      width: 50,
      render: (id) => {
        return <Button className={"button"} onClick={() => { setShowModal(true) }}> Edit</Button>
      },
    },
  ];

  useEffect(() => {
    setSelectedRecord(data[0])
    selectedData.current = data[0]
  }, [])

  useEffect(() => {
    const val = searchString?.trim()?.toLowerCase()
    if (val) {
      const exisintTableRecord = data?.filter(x => x.id?.toString() === val || x.basicInfo.name?.toLowerCase()?.includes(val) ||
        x.basicInfo.email?.toLowerCase()?.includes(val) || x.address?.toLowerCase()?.includes(val) || x.company?.toLowerCase()?.includes(val)
        || x.mobile?.toString()?.includes(val)
      )
      setTableData(exisintTableRecord)
    }
  }, [searchString])



  const onHandleCheck = (id) => {

    let existingIds = [...selectedIds]
    if (existingIds?.includes(Number(id))) {
      existingIds = existingIds.filter(x => x.id !== Number(id))
    } else {
      existingIds.push(Number(id))
    }
    setSelectedIds(existingIds);
    setShowModal(false)
  }

  const getShortName = (record) => {
    if (record?.basicInfo?.name) {
      const nameArr = record?.basicInfo?.name?.split(' ');
      return nameArr[0]?.charAt(0).toUpperCase() + ' ' + (nameArr[1]?.charAt(0).toUpperCase() ?? '')
    }
  }

  const onFinish = (values) => {
    const { fullName, id, email, company, address, mobile } = values;
    const exisingRecord = [...tableData];
    if (values?.id) {
      const index = exisingRecord?.findIndex(x => x.id?.toString() === values?.id);
      exisingRecord[index] = {
        id,
        basicInfo: {
          name: fullName,
          email,
        },
        company,
        address,
        mobile
      };
    } else {
      exisingRecord?.push({
        id: exisingRecord?.length + 1,
        basicInfo: {
          name: fullName,
          email,
        },
        company,
        address,
        mobile
      })

    }
    setTableData(exisingRecord);
    selectedData.current = exisingRecord?.find(x => (!id ? x.id === exisingRecord?.length : x.id.toString() === id?.toString()));
    setSelectedRecord(selectedData.current);
    setShowModal(false)

  }

  const handleAddRecord = () => {
    setSelectedRecord({
      id: 0,
      fullName: '',
      email: '',
      company: '',
      address: '',
      mobile: null,
    })
    setShowModal(true)
  }

  const handleDelete = () => {
    const exisingRecord = tableData?.filter(x => !(selectedIds?.includes(Number(x.id))));
    setTableData(exisingRecord);
    setSelectedIds([]);
    setSelectedRecord(exisingRecord[0])
    selectedData.current = exisingRecord[0]
  }

  return (
    <>
      <SubHeader />
      <LeftPanel />

      <div className='container'>
        <Input
          placeholder='Search'
          className={'input-search'}
          style={{
            width: "20rem",
            marginRight: "1%",
            marginLeft: "1%",
            borderRadius: "10px"
          }}
          onChange={(e) => {
            setSearchString(e.target.value)
          }}
          value={searchString}
        />

        <Button
          onClick={handleAddRecord}
          type='button'
          className={"button"}
        >
          Add
        </Button>

        <Button
          onClick={() => { handleDelete() }}
          type='button'
          className={"button"}
        >
          Delete
        </Button>

      </div>

      <Row>
        <Col span={3}>
        </Col>
        <Col span={11} >
          <Table columns={columns} dataSource={tableData} pagination={false}
            className="ant-table-thead"
            rowClassName={(record) => selectedData.current?.id === record?.id ? 'selectedRow' : ''}
            onRow={(record) => {
              return {
                onClick: () => {
                  selectedData.current = record
                  setSelectedRecord(record);
                },
              };
            }}
          />
        </Col>
        <Col span={1}>
        </Col>
        <Col span={6} style={{ backgroundColor: "#eaeeef" }}>
          <div className='sideModal'>
            <div style={{ textAlign: "center" }}>
              <Avatar style={{ backgroundColor: 'skyblue', verticalAlign: 'middle' }} size={70} gap={1}>
                {getShortName(selectedData.current)}
              </Avatar>
              <br />
              <p className='detailed-name mar-0'>{selectedData?.current?.basicInfo?.name}</p>
              <p>{selectedData?.current?.basicInfo?.email}</p>
            </div>
            <div>
              <Row>
                <Col span={2}></Col>
                <Col span={6} style={{ lineHeight: "3rem" }}>
                  <label>Full Name</label>
                  <br />
                  <label>Email</label>
                  <br />
                  <label>Phone</label>
                  <br />
                  <label>Company</label>
                  <br />
                  <label>Address</label>
                  <br />
                </Col>
                <Col span={15} style={{ lineHeight: "3rem" }}>
                  :  <label>{selectedData?.current?.basicInfo?.name}</label>
                  <br />
                  :  <label>{selectedData?.current?.basicInfo?.email}</label>
                  <br />
                  :  <label>{selectedData?.current?.mobile}</label>
                  <br />
                  :  <label>{selectedData?.current?.company}</label>
                  <br />
                  :  <label>{selectedData?.current?.address}</label>
                  <br />
                </Col>
              </Row>

            </div>

          </div>
        </Col>
        {showModal && <AddEditRecord selectedRecord={selectedRecord} handleOk={onFinish}
          handleCancel={() => setShowModal(false)}
          show={showModal} />}
        <Col span={3}>
        </Col>
      </Row>

    </>
  )
}

export default contactTable;