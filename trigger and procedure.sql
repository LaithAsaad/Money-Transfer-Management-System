--TRIGGER
--1
create or replace TRIGGER CUSTOMER_ID_TRIGGER
BEFORE INSERT ON CUSTOMERS
FOR EACH ROW
DECLARE
   MAX_ID NUMBER;
BEGIN
   SELECT MAX(C_ID) INTO MAX_ID FROM customers;
   :NEW.C_ID := MAX_ID + 1;
END;



--2
create or replace TRIGGER totamount BEFORE
    INSERT ON transfers
    FOR EACH ROW
BEGIN
    IF ( :new.charge_type = 'S' ) THEN
        IF ( :new.charge < 10000 ) THEN
            :new.total_amount := :new.charge;
        ELSIF (
            :new.charge >= 10000
            AND :new.charge < 100000
        ) THEN
            :new.total_amount := :new.charge + ( :new.charge * 0.02 );
        ELSIF (
            :new.charge >= 100000
            AND :new.charge < 1000000
        ) THEN
            :new.total_amount := :new.charge + ( :new.charge * 0.05 );
        ELSIF (
            :new.charge >= 1000000
            AND :new.charge < 3000000
        ) THEN
            :new.total_amount := :new.charge + ( :new.charge * 0.07 );
        ELSE
            raise_application_error(-20001, 'Charge Value too large');
        END IF;

    ELSE
        :new.total_amount := :new.charge;
    END IF;
END;




--3
create or replace TRIGGER tranCancel
BEFORE UPDATE OF charge ON transfers
FOR EACH ROW
DECLARE
    -- Declare variables to hold the updated values
    m      NUMBER(11, 0);
    m5000  NUMBER(11, 0) := 0;
    m2000  NUMBER(11, 0) := 0;
    m1000  NUMBER(11, 0) := 0;
    m500   NUMBER(11, 0) := 0;
BEGIN
    IF (:new.CHARGE = 0) THEN
        -- Calculate the money denominations
        m := :new.total_amount;
        WHILE m > 0 LOOP
            IF (MOD(m, 5000) = 0) THEN
                m5000 := m5000 + 1;
                m := m - 5000;
            ELSIF (MOD(m, 2000) = 0) THEN
                m2000 := m2000 + 1;
                m := m - 2000;
            ELSIF (MOD(m, 1000) = 0) THEN
                m1000 := m1000 + 1;
                m := m - 1000;
            ELSE
                m500 := m500 + 1;
                m := m - 500;
            END IF;
        END LOOP;

        -- Update the balances
        UPDATE balance
        SET cnt = cnt - m5000
        WHERE money_class_id = 1 AND branch_id = :new.DESTINATION_BRANCH;
        
        UPDATE balance
        SET cnt = cnt + m5000
        WHERE money_class_id = 1 AND branch_id = :new.source_branch;

        UPDATE balance
        SET cnt = cnt - m2000
        WHERE money_class_id = 2 AND branch_id = :new.DESTINATION_BRANCH;
        
        UPDATE balance
        SET cnt = cnt + m2000
        WHERE money_class_id = 1 AND branch_id = :new.source_branch;

        UPDATE balance
        SET cnt = cnt + m1000
        WHERE money_class_id = 3 AND branch_id = :new.source_branch;
        
        UPDATE balance
        SET cnt = cnt - m1000
        WHERE money_class_id = 3 AND branch_id = :new.DESTINATION_BRANCH;

        UPDATE balance
        SET cnt = cnt - m500
        WHERE money_class_id = 4 AND branch_id = :new.source_branch;
        
        UPDATE balance
        SET cnt = cnt + m500
        WHERE money_class_id = 4 AND branch_id = :new.DESTINATION_BRANCH;

        -- Update the status of the transfer
        :new.status_id := 3;
    END IF;
END;




--4
create or replace TRIGGER TRANSFER_ID_TRIGGER
BEFORE INSERT ON TRANSFERS
FOR EACH ROW
DECLARE
   MAX_ID NUMBER;
BEGIN
   SELECT MAX(TRANSFER_ID) INTO MAX_ID FROM TRANSFERS;
   :NEW.TRANSFER_ID := MAX_ID + 1;
END;




--5
create or replace TRIGGER transMoney
AFTER INSERT ON TRANSFERS 
FOR EACH ROW 
declare
    m NUMBER(11,0);
    m5000 NUMBER(11,0) := 0;
    m2000 NUMBER(11,0) := 0;
    m1000 NUMBER(11,0):= 0;
    m500 NUMBER(11,0):= 0;

BEGIN
  m := :New.TOTAL_AMOUNT;
  WHILE m > 0
LOOP
   IF (Mod(m,5000) = 0) THEN
      m5000 := m5000 + 1;
      m := m - 5000;

   ELSIF (Mod(m,2000) = 0) THEN
      m2000 := m2000 + 1;
      m := m - 2000;

   ELSIF (Mod(m,1000) = 0) THEN
      m1000 := m1000 + 1;
      m := m - 1000;

   ELSE
      m500 := m500 + 1;
      m := m - 500;

   END IF;


END LOOP;

UPDATE balance
SET
    cnt = cnt+  m5000
WHERE
    money_class_id = 1 and branch_id = :new.DESTINATION_BRANCH;

UPDATE balance
SET
    cnt = cnt+ m2000
WHERE
    money_class_id = 2 and branch_id = :new.DESTINATION_BRANCH;

UPDATE balance
SET
    cnt = cnt+ m1000
WHERE
    money_class_id = 3 and branch_id = :new.DESTINATION_BRANCH;

UPDATE balance
SET
    cnt = cnt+  m500
WHERE
    money_class_id = 4 and branch_id = :new.DESTINATION_BRANCH;
END;





--6
create or replace TRIGGER TRANSRRECEIVE_compound
FOR UPDATE OF HANDED_DATE ON TRANSFERS 
COMPOUND TRIGGER 
  TYPE transfer_ids_t IS TABLE OF TRANSFERS.TRANSFER_ID%TYPE;
  transfer_ids transfer_ids_t := transfer_ids_t();

  BEFORE STATEMENT IS
  BEGIN
    transfer_ids := transfer_ids_t();
  END BEFORE STATEMENT;

  AFTER EACH ROW IS
  BEGIN
    transfer_ids.EXTEND;
    transfer_ids(transfer_ids.LAST) := :NEW.TRANSFER_ID;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    IF transfer_ids.COUNT > 0 THEN
      FOR i IN 1..transfer_ids.COUNT LOOP
        UPDATE TRANSFERS SET STATUS_ID = 1 WHERE TRANSFER_ID = transfer_ids(i);
      END LOOP;
    END IF;
  END AFTER STATEMENT;
END TRANSRRECEIVE_compound;






--7
create or replace TRIGGER transSend
BEFORE INSERT ON TRANSFERS 
FOR EACH ROW 
BEGIN
  :NEW.STATUS_ID := 2;
  SELECT SYSDATE INTO :NEW.ISSUE_DATE FROM DUAL;
  SELECT SYSDATE INTO :NEW.HANDED_DATE FROM DUAL;
END;






--PROCEDURE
--1
create or replace PROCEDURE add_customer (c_first_name IN VARCHAR2, c_father_name IN VARCHAR2, c_last_name IN VARCHAR2, C_MOBILE_NUM IN NUMBER, C_NATIONAL_NUM IN NUMBER, C_PASSPORT_NUM IN NUMBER, C_CAREER IN VARCHAR2, C_ADDRESS IN VARCHAR2, COMMERCIAL_NUM IN NUMBER, REMARK IN VARCHAR2)
IS
begin
    INSERT INTO customers(c_first_name, c_father_name, c_last_name, C_MOBILE_NUM, C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, COMMERCIAL_NUM, REMARK)
         VALUES(c_first_name, c_father_name, c_last_name,C_MOBILE_NUM, C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, COMMERCIAL_NUM, REMARK);
    COMMIT;
end add_customer;





--2
create or replace PROCEDURE add_transfer (CHARGE_TYPE IN CHAR, CHARGE IN NUMBER, SENDER IN NUMBER, RECEIVER IN NUMBER, RECEPTIONIST IN NUMBER, SOURCE_ACCOUNTANT IN NUMBER, DESTINATION_ACCOUNTANT IN NUMBER, SOURCE_BRANCH IN NUMBER, DESTINATION_BRANCH IN NUMBER)
IS
begin
    INSERT INTO transfers(CHARGE_TYPE, CHARGE, SENDER, RECEIVER, RECEPTIONIST, SOURCE_ACCOUNTANT, DESTINATION_ACCOUNTANT, SOURCE_BRANCH, DESTINATION_BRANCH)
         VALUES(CHARGE_TYPE, CHARGE, SENDER, RECEIVER, RECEPTIONIST, SOURCE_ACCOUNTANT, DESTINATION_ACCOUNTANT, SOURCE_BRANCH, DESTINATION_BRANCH);
    COMMIT;
end add_transfer;





--3
create or replace PROCEDURE add_transfers (c_first_name IN VARCHAR2, c_father_name IN VARCHAR2, c_last_name IN VARCHAR2, C_MOBILE_NUM IN NUMBER, C_NATIONAL_NUM IN NUMBER, C_PASSPORT_NUM IN NUMBER, C_CAREER IN VARCHAR2, C_ADDRESS IN VARCHAR2, c2_first_name IN VARCHAR2, c2_father_name IN VARCHAR2, c2_last_name IN VARCHAR2, C2_MOBILE_NUM IN NUMBER,CHARGE_TYPE IN CHAR, CHARGE IN NUMBER, RECEPTIONIST IN NUMBER, SOURCE_ACCOUNTANT IN NUMBER, DESTINATION_ACCOUNTANT IN NUMBER, SOURCE_BRANCH IN NUMBER, DESTINATION_BRANCH IN NUMBER)
IS
    sender_id NUMBER;
    receiver_id NUMBER;
begin
    INSERT INTO CUSTOMERS(C_FIRST_NAME, C_FATHER_NAME, C_LAST_NAME, C_MOBILE_NUM, C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, COMMERCIAL_NUM, REMARK)
                        VALUES(c_first_name,c_father_name,c_last_name,C_MOBILE_NUM,C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, NULL, NULL);
    SELECT MAX(C_ID) INTO sender_id FROM CUSTOMERS;

    INSERT INTO CUSTOMERS(C_FIRST_NAME, C_FATHER_NAME, C_LAST_NAME, C_MOBILE_NUM, C_NATIONAL_NUM, C_PASSPORT_NUM, C_CAREER, C_ADDRESS, COMMERCIAL_NUM, REMARK)
                        VALUES(c2_first_name,c2_father_name,c2_last_name,C2_MOBILE_NUM,NULL, NULL, NULL, NULL, NULL, NULL);
    SELECT MAX(C_ID) INTO receiver_id FROM CUSTOMERS;

    INSERT INTO transfers(CHARGE_TYPE, CHARGE, SENDER, RECEIVER, RECEPTIONIST, SOURCE_ACCOUNTANT, DESTINATION_ACCOUNTANT, SOURCE_BRANCH, DESTINATION_BRANCH)
         VALUES(CHARGE_TYPE, CHARGE, sender_id, receiver_id, RECEPTIONIST, SOURCE_ACCOUNTANT, DESTINATION_ACCOUNTANT, SOURCE_BRANCH, DESTINATION_BRANCH);
    COMMIT;
end add_transfers;