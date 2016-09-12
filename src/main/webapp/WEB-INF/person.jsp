<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false"%>
<%@ page session="false" %>
<html>
  <head>
    <title>Spitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />" >
  </head>
  <body>
    <h1>Your Profile</h1>
    
    <%=request.getAttribute("pp") %>
    <p>---------------------</p>
    ${pp}
    <c:out value="${pp.name}" /><br/>
    <c:out value="${pp.name}" /><br/>
    <c:out value="${spitter.firstName}" /> <c:out value="${spitter.lastName}" /><br/>
    <c:out value="${spitter.email}" />
    <c:url value="/test.jsp" var="myurl">
    	<c:param name="pname" value="ddffcc"></c:param>
    	<c:param name="id" value="123456"></c:param>
    </c:url>
    ${myurl}
  </body>
</html>
