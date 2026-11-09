# POTTOSTORE
## Detailed Product Overview and Functional Specification

**Product Name:** PottoStore  
**Product Category:** School E-commerce and Inventory Management System  
**Product Owner:** Potto Technologies  
**Platform:** Web Application, Mobile Application and School Store Interface  
**Target Users:** Schools, School Administrators, Store Managers, Parents, Guardians and Students

---

# 1. PRODUCT OVERVIEW

PottoStore is a school-focused e-commerce platform designed to digitise and simplify the buying and selling of school-related products and services.

It provides schools with an online store where they can list, manage and sell products such as admission forms, textbooks, stationery, uniforms, snacks and other school-approved materials.

The platform serves both parents and students by providing convenient shopping experiences. Parents can purchase items for their children remotely through the PottoStore application or website, while students can make cashless purchases within the school premises using their Potto smart cards.

PottoStore also provides schools with tools for product management, inventory monitoring, sales tracking and financial reconciliation.

The primary objective is to eliminate manual and fragmented school store operations, improve transparency in school-related purchases, simplify inventory management and provide parents with greater control over their children's spending.

# 2. PRODUCT OBJECTIVES

The major objectives of PottoStore include:

1. Provide schools with a digital marketplace for selling school-related products and materials.
2. Enable parents to purchase items for their children without physically visiting the school.
3. Allow students to make cashless purchases within the school using smart cards.
4. Help parents monitor and control their children's purchases.
5. Enable schools to manage products, categories, prices and inventory centrally.
6. Provide real-time visibility into available stock.
7. Automate sales recording and transaction reconciliation.
8. Reduce manual bookkeeping and errors associated with traditional school store operations.
9. Improve accountability and transparency in school store transactions.
10. Provide schools with useful sales and inventory reports.

# 3. TARGET USERS AND ROLES

## 3.1 Super Administrator

The super administrator manages the overall PottoStore infrastructure and platform-level configurations.

Responsibilities include:

- Managing registered schools.
- Monitoring platform-wide activities.
- Managing school subscriptions and access.
- Configuring global platform settings.
- Monitoring transactions and system activities.
- Managing support and technical issues.
- Monitoring application performance.

## 3.2 School Administrator

The school administrator oversees the school's Store operations.

Responsibilities include:

- Configuring the school's online store.
- Managing store users and permissions.
- Creating and managing product categories.
- Monitoring products and inventory.
- Reviewing sales and transaction reports.
- Managing store policies.
- Monitoring purchases made by students and parents.
- Reviewing financial reconciliation reports.

## 3.3 Store Manager

The store manager handles the daily operation of the school store.

Responsibilities include:

- Adding and updating products.
- Managing product prices.
- Updating product quantities.
- Processing customer orders.
- Confirming product availability.
- Preparing and fulfilling orders.
- Recording stock adjustments.
- Monitoring low-stock products.
- Generating sales reports.

## 3.4 Store Attendant / Cashier

The store attendant handles physical store transactions and assists students with purchases.

Responsibilities include:

- Identifying students through their smart cards or approved identification methods.
- Processing purchases.
- Checking product availability.
- Confirming transaction amounts.
- Issuing transaction confirmations.
- Assisting with order fulfilment.
- Viewing relevant transaction records.

The attendant should only have access to functions necessary for their assigned duties.

## 3.5 Parent / Guardian

Parents and guardians use PottoStore to purchase products for their children and monitor their spending.

Responsibilities and capabilities include:

- Accessing the school's store.
- Browsing available products.
- Viewing product descriptions and prices.
- Checking stock availability.
- Adding products to a shopping cart.
- Purchasing items for linked children.
- Selecting delivery or collection options where supported.
- Viewing order history.
- Monitoring purchases.
- Managing permitted spending restrictions.
- Blocking or restricting selected products where supported.

## 3.6 Student

Students can use PottoStore to make purchases within the school.

Capabilities include:

- Browsing available products.
- Making purchases using an authorised smart card.
- Viewing purchase confirmations.
- Checking permitted transaction information.
- Purchasing products within their allocated spending limits.

# 4. CORE FUNCTIONAL MODULES

## 4.1 Store Configuration and School Setup

Every participating school should have its own independent store environment.

The school administrator should be able to:

- Activate or deactivate the school's store.
- Configure the store name and description.
- Upload a store logo or branding image.
- Configure store contact information.
- Configure store operating hours.
- Define available payment methods.
- Configure collection and delivery options.
- Assign store managers and attendants.
- Configure applicable purchasing policies.

The platform must maintain strict separation between schools so that one school cannot access another school's products, transactions or inventory.

## 4.2 Product Category Management

Schools should be able to organise products into categories for easier navigation.

Examples include:

- Textbooks.
- Stationery.
- School uniforms.
- Sportswear.
- Snacks and refreshments.
- Learning materials.
- Admission forms.
- School merchandise.
- Other school-approved products.

Administrators should be able to:

- Create categories.
- Edit category names and descriptions.
- Upload category images.
- Activate or deactivate categories.
- Arrange category display order.
- Assign products to categories.

## 4.3 Product Management

The product management module allows authorised school personnel to create and maintain the store catalogue.

Each product should support the following information:

- Product name.
- Product description.
- Product images.
- Product category.
- Product SKU or unique identifier.
- Selling price.
- Available quantity.
- Product status.
- School association.
- Product variants where applicable.
- Creation and modification timestamps.

Product variants may include:

- Size.
- Colour.
- Type.
- Edition.
- Packaging.

For example, a school uniform may have different sizes and colours, each with its own inventory quantity.

Product management operations should include:

- Create product.
- Edit product.
- Delete or archive product.
- Activate or deactivate product.
- Update price.
- Update inventory.
- View product sales history.
- Search and filter products.

## 4.4 Inventory Management

Inventory management is one of the central components of PottoStore.

The system should provide schools with accurate information about products entering and leaving the store.

Inventory capabilities should include:

- Recording initial stock quantities.
- Recording new stock purchases.
- Updating existing stock.
- Tracking quantities sold.
- Tracking available stock.
- Recording damaged or expired products.
- Recording manual stock adjustments.
- Monitoring low-stock products.
- Maintaining inventory movement history.

Every inventory adjustment should record:

- Product.
- Previous quantity.
- Quantity added or removed.
- New quantity.
- Reason for adjustment.
- User responsible.
- Date and time.

The system should prevent sales beyond available inventory unless a specific product configuration permits backorders.

Inventory should automatically update after a successfully completed purchase.

## 4.5 Online Shopping and Product Catalogue

Parents and students should have access to a user-friendly shopping interface.

The shopping interface should provide:

- Product listing.
- Product categories.
- Product search.
- Product filtering.
- Product details.
- Product images.
- Pricing information.
- Stock availability.
- Product variants.
- Shopping cart.

Users should be able to select products, specify quantities and add them to their shopping carts.

The shopping cart should display:

- Selected products.
- Product quantities.
- Individual prices.
- Subtotals.
- Applicable charges.
- Total payable amount.

The system should validate product availability and current pricing before completing an order.

## 4.6 Parent Shopping and Remote Purchases

Parents should be able to purchase school-related items for their children from outside the school environment.

The parent should be able to:

1. Log into the Potto application or website.
2. Access the school store associated with their child.
3. Browse available products.
4. Select the intended child where multiple children are linked to the account.
5. Add products to the shopping cart.
6. Review the order.
7. Complete payment using an available payment method.
8. Receive an order confirmation.
9. Monitor the order's fulfilment status.

Where supported, parents should be able to arrange delivery to the school or another approved collection location.

The platform should maintain a clear association between the parent, student, order and school.

## 4.7 Student Smart Card Purchases

PottoStore supports cashless purchases within the school through student smart cards.

The smart card provides a convenient way for students to purchase approved items without carrying physical cash.

A typical transaction should follow this workflow:

1. The student visits the school store.
2. The student selects the desired products.
3. The store attendant identifies the student using the smart card.
4. The system validates the card and identifies the student's account.
5. The system retrieves the student's applicable spending permissions.
6. The selected products and total purchase amount are displayed.
7. The system validates the available balance and spending restrictions.
8. The student confirms the purchase.
9. The transaction is processed.
10. The purchase is recorded.
11. The available balance is updated.
12. The inventory is reduced accordingly.
13. A transaction confirmation is generated.

The system should reject transactions where:

- The smart card is invalid.
- The card has been deactivated.
- The student account is inactive.
- The student has insufficient funds.
- The purchase exceeds an applicable spending limit.
- A selected product is restricted.
- The requested product quantity exceeds available stock.

## 4.8 Student Spending Controls and Product Restrictions

PottoStore gives parents the ability to monitor and control their children's spending.

The platform should support configurable spending restrictions, subject to the available Potto Pocket integration.

Potential controls include:

- Daily spending limits.
- Weekly spending limits.
- Monthly spending limits.
- Individual transaction limits.
- Product restrictions.
- Product category restrictions.
- Spending history.
- Smart card activation and deactivation.

For example, a parent may decide that their child should not purchase certain snacks or products.

The system should validate restrictions before approving the purchase.

Product restrictions should be enforced at the transaction level, not merely hidden from the student's product catalogue.

## 4.9 Order Management

Every successful online purchase should generate an order record.

The order management module should allow authorised personnel to view and process customer orders.

Suggested order statuses include:

- Pending Payment.
- Paid.
- Processing.
- Ready for Collection.
- Out for Delivery.
- Completed.
- Cancelled.
- Refunded.

Each order should contain:

- Order reference.
- School.
- Customer information.
- Student information where applicable.
- Ordered products.
- Product quantities.
- Unit prices.
- Total amount.
- Payment reference.
- Order status.
- Fulfilment information.
- Creation timestamp.

Store managers should be able to search orders by order reference, student, parent, date, status and product.

## 4.10 Admission Form Sales

PottoStore also supports the sale of school admission forms.

Schools should be able to publish admission forms as purchasable items.

The process should include:

1. The school creates an admission form product.
2. The form is published in the school's store.
3. Prospective parents or applicants access the store.
4. The applicant selects the admission form.
5. The applicant completes payment.
6. The system generates a payment confirmation.
7. The applicant receives access to the relevant admission application process.

Where admission application processing is handled by another Potto module, Store should integrate with that module rather than duplicate its functionality.

## 4.11 Payment Management

PottoStore should support the payment methods enabled for the school.

These may include:

- Potto Pocket student wallet.
- Integrated electronic payment providers.
- Other approved payment channels.

Every successful payment should generate a unique transaction reference.

Payment records should contain:

- Transaction reference.
- Order reference.
- Student or parent account.
- School.
- Amount.
- Payment method.
- Payment status.
- Transaction date.
- External payment reference where applicable.

The system should distinguish between:

- Initiated payments.
- Successful payments.
- Failed payments.
- Pending payments.
- Reversed payments.
- Refunded payments.

The system must never treat a payment as successful solely because the frontend receives a success response. Payment confirmation must be validated through the appropriate trusted payment source.

## 4.12 Account Reconciliation

Account reconciliation is an important part of PottoStore.

The system should make it possible for schools to compare store sales against actual payments received.

The reconciliation module should provide:

- Total sales.
- Successful transactions.
- Failed transactions.
- Pending transactions.
- Refunds.
- Wallet purchases.
- Electronic payment transactions.
- Outstanding payment records.
- Reconciliation summaries.

The platform should identify discrepancies between order records, payment records and financial transactions.

Every transaction should be traceable using its unique reference.

# 5. REPORTING AND ANALYTICS

PottoStore should provide useful reports to help schools monitor their commercial activities.

Suggested reports include:

## Sales Reports
- Total sales within a selected period.
- Daily sales.
- Weekly sales.
- Monthly sales.
- Sales by product.
- Sales by category.
- Sales by payment method.
- Sales by store attendant.

## Inventory Reports
- Current stock.
- Low-stock products.
- Out-of-stock products.
- Stock movement history.
- Damaged stock.
- Stock adjustments.
- Most frequently purchased products.

## Order Reports
- Total orders.
- Completed orders.
- Pending orders.
- Cancelled orders.
- Refunded orders.
- Orders awaiting collection.

## Student Purchase Reports
- Individual student purchases.
- Spending history.
- Total spending within a selected period.
- Restricted product purchase attempts.
- Spending limit utilisation.

Reports should support date filtering and export to suitable formats such as PDF and Excel where implemented.

# 6. NOTIFICATIONS

The system should provide relevant notifications to users.

Potential notifications include:

**Parents**
- Successful purchase.
- Failed purchase.
- Low student wallet balance.
- Student purchase notification.
- Order confirmation.
- Order ready for collection.
- Order delivery update.
- Refund confirmation.

**Store Managers**
- New order.
- Successful payment.
- Low inventory.
- Out-of-stock product.
- Order awaiting fulfilment.

**School Administrators**
- Store activity summaries.
- Reconciliation discrepancies.
- Significant inventory adjustments.
- Unusual transaction activity.

Notifications may be delivered through push notifications, SMS or email, depending on the available integrations.

# 7. INTEGRATION WITH OTHER POTTO PRODUCTS

PottoStore should operate as part of the broader Potto ecosystem.

## 7.1 Potto Admin

Potto Admin should provide relevant school information, including:

- School records.
- Student records.
- Parent and guardian records.
- Staff information.
- Class and academic information.

PottoStore should reuse existing school and user records rather than maintain unnecessary duplicate records.

## 7.2 Potto Pocket

Potto Pocket provides the student wallet and spending-management functionality.

The integration should support:

- Retrieving wallet balances.
- Validating available funds.
- Processing authorised purchases.
- Deducting successful transaction amounts.
- Recording transaction references.
- Enforcing spending restrictions.
- Updating transaction histories.

Wallet transactions should be processed securely and atomically to prevent duplicate deductions or inconsistent balances.

## 7.3 Potto Pay

Potto Pay provides electronic payment and fee collection capabilities within the Potto ecosystem.

Where appropriate, Store should integrate with the payment infrastructure to support electronic payments and financial reporting.

The exact ownership of payment processing and reconciliation should be clearly defined to prevent duplicated financial records.

## 7.4 Potto Secure and Smart Card Infrastructure

Where smart cards are used for student identification, Store should rely on the appropriate Potto identity and card validation services.

Card identification should be separated from financial authorisation.

A valid smart card does not automatically mean that a purchase should be approved. The student's account, available funds and purchasing permissions must also be validated.

# 8. SECURITY AND ACCESS CONTROL

Because PottoStore handles student information and financial transactions, security is essential.

The system should implement:

- Role-based access control.
- School-level data isolation.
- Secure authentication.
- Encrypted communication.
- Smart card validation.
- Transaction authorisation.
- Audit logging.
- Payment verification.
- Session management.
- Secure handling of parent and student records.

Sensitive operations should be logged, including:

- Product price changes.
- Inventory adjustments.
- Refunds.
- Manual transaction corrections.
- User permission changes.
- Smart card activation or deactivation.

A user should only access the school data and operations permitted by their assigned role.

# 9. IMPORTANT BUSINESS RULES

1. Every product must belong to a specific school.
2. Every order must be associated with a school.
3. Product prices must be validated by the backend.
4. Inventory must not be reduced for failed purchases.
5. A successful purchase must have a corresponding transaction record.
6. A single payment reference must not be processed more than once.
7. A student must not exceed applicable spending restrictions.
8. Deactivated smart cards must not authorise purchases.
9. Restricted products must not be purchasable by students.
10. Every inventory adjustment must be traceable.
11. Refunds must be associated with the original transaction.
12. School administrators must not access another school's financial records.
13. Completed transactions must not be silently deleted or altered.
14. Financial corrections must be recorded through traceable adjustment or reversal processes.
15. Product availability must be validated during checkout and purchase processing.

# 10. KEY TECHNICAL AND ARCHITECTURAL CONSIDERATIONS

For a scalable implementation, PottoStore should consider the following architectural components:

- Multi-tenant school management.
- Product catalogue service.
- Inventory management.
- Shopping cart and checkout.
- Order management.
- Payment integration.
- Wallet integration.
- Smart card validation.
- Spending restrictions.
- Notification services.
- Financial reconciliation.
- Reporting and analytics.
- Audit logging.

Particular attention should be given to transaction consistency.

For example, when a student purchases an item using a smart card, the system must ensure that:

1. The student is correctly identified.
2. The card is valid.
3. The product exists.
4. The product is available.
5. The student is permitted to purchase it.
6. The wallet has sufficient funds.
7. The purchase is processed only once.
8. The wallet transaction is recorded.
9. Inventory is updated.
10. The purchase appears in the appropriate reports.

These operations should be designed to avoid duplicate purchases, double deductions and inventory inconsistencies.

# 11. POTENTIAL FUTURE ENHANCEMENTS

The following are possible improvements that could make PottoStore more comprehensive:

- Barcode scanning for faster store transactions.
- Point-of-sale terminal interface.
- Multiple store locations within one school.
- Supplier and purchase-order management.
- Automated stock replenishment alerts.
- Product bundles and school packages.
- Discount and promotional management.
- Advanced sales analytics.
- Bulk product imports.
- Product return and exchange workflows.
- Improved parent purchase approvals.
- Scheduled student spending allowances.
- Offline-capable point-of-sale operations with secure transaction synchronisation.

These are proposed enhancements, not confirmed existing capabilities.

# 12. PRODUCT SUCCESS METRICS

PottoStore's effectiveness can be measured through:

- Number of schools actively using the store.
- Number of active parents and students.
- Number of completed transactions.
- Total transaction value.
- Percentage of successful purchases.
- Average order fulfilment time.
- Inventory accuracy.
- Reduction in manual store reconciliation.
- Number of successfully processed smart card purchases.
- Frequency of transaction disputes.
- Parent satisfaction.
- Store manager satisfaction.

# 13. PRODUCT SUMMARY

PottoStore is a digital school commerce platform that connects schools, parents and students through a centralised marketplace.

It enables schools to sell admission forms, educational materials and other school-related products while providing parents with convenient remote purchasing capabilities and students with cashless in-school shopping through smart cards.

Beyond e-commerce, the platform supports inventory management, transaction monitoring, student spending controls and financial reconciliation.

Its integration with Potto Pocket, Potto Pay and Potto Admin makes it an important component of the wider Potto ecosystem.

**Core Value Proposition:**

To provide schools with an organised, transparent and cashless commerce environment while making school-related purchases easier for parents and students.
