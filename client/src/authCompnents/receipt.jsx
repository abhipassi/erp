import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Receipt = () => {
  const [formData, setFormData] = useState({
    admissionNo: "",
    receiptNo: "",
    studentId: "",
    installmentId: "",
    amountPaid: "",
    paymentMethod: "",
    paymentDate: "",
    cgst: 0,
    utgst: 0,
    total: 0,
    pendingFees: "",
    amountInWords: "",
  });

  const [students, setStudents] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Generate receipt number
  const generateReceiptNo = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/receipts");
      const receipts = res.data;
      const lastReceipt =
        receipts.length > 0 ? receipts[receipts.length - 1] : null;

      if (lastReceipt && lastReceipt.receiptNo) {
        const lastNumber = parseInt(lastReceipt.receiptNo.split("-")[1]);
        const nextNumber = lastNumber + 1;
        return `RCPT-${nextNumber.toString().padStart(4, "0")}`;
      } else {
        return "RCPT-0001";
      }
    } catch (error) {
      console.error(error);
      return "RCPT-0001";
    }
  };

  // Fetch students and installments
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentRes, installmentRes] = await Promise.all([
        axios.get("http://localhost:3000/api/students"),
        axios.get("http://localhost:3000/api/installments"),
      ]);
      setStudents(studentRes.data);
      setInstallments(installmentRes.data);

      const newReceiptNo = await generateReceiptNo();
      setFormData((prev) => ({ ...prev, receiptNo: newReceiptNo }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle student change to show details
  const handleStudentChange = async (e) => {
    const studentId = e.target.value;
    setFormData({ ...formData, studentId });
    try {
      const res = await axios.get(
        `http://localhost:3000/api/students/${studentId}`
      );
      setSelectedStudent(res.data);

      // Auto-fill admission number if available from student data
      setFormData((prev) => ({
        ...prev,
        admissionNo: res.data?.admissionNo || "",
      }));
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  // Handle amount change & auto-tax
  const handleAmountChange = (e) => {
    const value = e.target.value;
    const cgst = (value * 9) / 100;
    const utgst = (value * 9) / 100;
    const total = parseFloat(value) + cgst + utgst;

    setFormData({
      ...formData,
      amountPaid: value,
      cgst,
      utgst,
      total,
    });
  };

  // Convert number to words
  const convertToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    if ((num = num.toString()).length > 9) return "Overflow";
    let n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand "
        : "";
    str += n[4] != 0 ? a[n[4]] + " Hundred " : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          " Only"
        : "";
    return str;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/receipts", formData);
      alert("✅ Receipt added successfully!");
      setFormData({
        admissionNo: "",
        receiptNo: await generateReceiptNo(),
        studentId: "",
        installmentId: "",
        amountPaid: "",
        paymentMethod: "",
        paymentDate: "",
        cgst: 0,
        utgst: 0,
        total: 0,
        pendingFees: "",
        amountInWords: "",
      });
      setShowReceipt(true);
    } catch (error) {
      console.error(error);
      alert("❌ Error adding receipt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <h3 className="text-center mb-4">🧾 Add New Receipt</h3>
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Admission No</Form.Label>
              <Form.Control
                type="text"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={(e) =>
                  setFormData({ ...formData, admissionNo: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Receipt No</Form.Label>
              <Form.Control type="text" value={formData.receiptNo} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="studentId"
                value={formData.studentId}
                onChange={handleStudentChange}
                required
              >
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.studentName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Installment</Form.Label>
              <Form.Select
                name="installmentId"
                value={formData.installmentId}
                onChange={(e) =>
                  setFormData({ ...formData, installmentId: e.target.value })
                }
              >
                <option value="">Select installment</option>
                {installments.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.installmentName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleAmountChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={(e) =>
                  setFormData({ ...formData, paymentDate: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Auto Calculated Section */}
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>CGST (9%)</Form.Label>
              <Form.Control type="text" value={formData.cgst} readOnly />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>UTGST (9%)</Form.Label>
              <Form.Control type="text" value={formData.utgst} readOnly />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="text" value={formData.total} readOnly />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Pending Fees</Form.Label>
              <Form.Control
                type="number"
                name="pendingFees"
                value={formData.pendingFees}
                onChange={(e) =>
                  setFormData({ ...formData, pendingFees: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Receipt"}
        </Button>
      </Form>

      {/* Printable Receipt Section */}
      {showReceipt && (
        <Card className="mt-5 p-4 shadow" id="printSection">
          <h4 className="text-center mb-4">🎟 Receipt</h4>
          <p><strong>Admission No:</strong> {formData.admissionNo}</p>
          <p><strong>Receipt No:</strong> {formData.receiptNo}</p>
          <p><strong>Student:</strong> {selectedStudent?.studentName}</p>
          <p><strong>Course:</strong> {selectedStudent?.courseApplied}</p>
          <p><strong>Address:</strong> {selectedStudent?.address}</p>
          <p><strong>Payment Date:</strong> {formData.paymentDate}</p>
          <p><strong>Mode:</strong> {formData.paymentMethod}</p>
          <p><strong>Amount:</strong> ₹{formData.amountPaid}</p>
          <p><strong>CGST:</strong> ₹{formData.cgst}</p>
          <p><strong>UTGST:</strong> ₹{formData.utgst}</p>
          <p><strong>Total:</strong> ₹{formData.total}</p>
          <p><strong>Pending Fees:</strong> ₹{formData.pendingFees}</p>
          <p><strong>Amount in Words:</strong> {convertToWords(formData.total)}</p>

          <div className="text-center mt-4">
            <Button variant="success" onClick={() => window.print()}>
              🖨 Print Receipt
            </Button>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default Receipt;
