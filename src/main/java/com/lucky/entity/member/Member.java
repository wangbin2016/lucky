package com.lucky.entity.member;

import java.util.Date;

public class Member {
	// ��ԱId
	private Integer id;
	// �ʺ�
	private String account;
	// ��ʾ������
	private String nickName;
	// ����
	private String name;
	// ֤������
	private Integer certType;
	// ֤������
	private String certNo;
	// ����
	private String password;
	// ��������
	private String email;
	// �绰����
	private String mobile;
	// ״̬
	private Integer status;
	// ע��ʱ��
	private Date registerDateTime;
	// ����¼ʱ��
	private Date lastLoginDateTime;
	// �ܵľ���ֵ
	private Integer exprerience;
	// ��Դ���
	private Integer sourceId;
	// ������Ӧ��
	private String provider;
	// �û�ͷ��
	private String picture;
	// �Ƿ��ֻ���֤ͨ��
	private Integer isMobileAuthed;
	// �Ƿ�������֤ͨ��
	private Integer isEmailAuthed;
	// �Ƿ�VIP
	private Integer isVIP;
	// �Ƿ��ֵ
	private Integer isCharge; // 0δ��ֵ�� 1��ֵ��
	// �Ƿ������˻�
	private Integer isVirtualAccount;// 0 �� 1 ��

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCertType() {
		return certType;
	}

	public void setCertType(Integer certType) {
		this.certType = certType;
	}

	public String getCertNo() {
		return certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getRegisterDateTime() {
		return registerDateTime;
	}

	public void setRegisterDateTime(Date registerDateTime) {
		this.registerDateTime = registerDateTime;
	}

	public Date getLastLoginDateTime() {
		return lastLoginDateTime;
	}

	public void setLastLoginDateTime(Date lastLoginDateTime) {
		this.lastLoginDateTime = lastLoginDateTime;
	}

	public Integer getExprerience() {
		return exprerience;
	}

	public void setExprerience(Integer exprerience) {
		this.exprerience = exprerience;
	}

	public Integer getSourceId() {
		return sourceId;
	}

	public void setSourceId(Integer sourceId) {
		this.sourceId = sourceId;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public Integer getIsMobileAuthed() {
		return isMobileAuthed;
	}

	public void setIsMobileAuthed(Integer isMobileAuthed) {
		this.isMobileAuthed = isMobileAuthed;
	}

	public Integer getIsEmailAuthed() {
		return isEmailAuthed;
	}

	public void setIsEmailAuthed(Integer isEmailAuthed) {
		this.isEmailAuthed = isEmailAuthed;
	}

	public Integer getIsVIP() {
		return isVIP;
	}

	public void setIsVIP(Integer isVIP) {
		this.isVIP = isVIP;
	}

	public Integer getIsCharge() {
		return isCharge;
	}

	public void setIsCharge(Integer isCharge) {
		this.isCharge = isCharge;
	}

	public Integer getIsVirtualAccount() {
		return isVirtualAccount;
	}

	public void setIsVirtualAccount(Integer isVirtualAccount) {
		this.isVirtualAccount = isVirtualAccount;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", account=" + account + ", nickName=" + nickName + ", name=" + name + ", certType="
				+ certType + ", certNo=" + certNo + ", password=" + password + ", email=" + email + ", mobile=" + mobile
				+ ", status=" + status + ", registerDateTime=" + registerDateTime + ", lastLoginDateTime="
				+ lastLoginDateTime + ", exprerience=" + exprerience + ", sourceId=" + sourceId + ", provider="
				+ provider + ", picture=" + picture + ", isMobileAuthed=" + isMobileAuthed + ", isEmailAuthed="
				+ isEmailAuthed + ", isVIP=" + isVIP + ", isCharge=" + isCharge + ", isVirtualAccount="
				+ isVirtualAccount + "]";
	}

}
