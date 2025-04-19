# Security Policy

## Supported Versions

We actively maintain security fixes for the following versions of **Newsletter Creator**:

| Version  | Supported     |
| -------- | ------------- |
| `2.x`    | :white_check_mark: (latest) |
| `1.x`    | :white_check_mark:        |
| `< 1.0`  | :x: (End of life)        |

> **Tip:** Always upgrade to the latest patch release in your major version to receive the most timely security fixes.

---

## Reporting a Vulnerability

If you discover a security vulnerability in **Newsletter Creator**, please let us know **privately**:

1. **Email:** security@newslettercreator.dev  
2. **Subject:** `[SECURITY] <short description>`  
3. **Include:**  
   - A clear description of the issue  
   - Steps to reproduce (minimal test case if possible)  
   - Impact assessment (e.g. remote code execution, data leak)  
   - Your contact details for follow‑up questions  

We will respond within **48 hours** to acknowledge receipt and work with you on a fix. Once a patch is ready, we will release it as a security update and give you credit (unless you request anonymity).

---

## Supported Remediation Process

1. **Acknowledgment:** Within 48 hours of receipt.  
2. **Triage & Analysis:** We’ll assess severity (using CVSS v3) and scope.  
3. **Patch Development:** We aim to provide a fix in the next minor release, or sooner for high‑severity issues.  
4. **Disclosure:** After a patch is published, we will publicly credit the reporter and update this policy with a summary.

---

## Severity Levels

We classify vulnerabilities according to [CVSS v3.1](https://www.first.org/cvss/specification-document):

- **High / Critical:** Remote code execution, credential leak, privilege escalation → **Fix immediately**  
- **Medium:** Partial data exposure, moderate bypass → **Fix in next patch release**  
- **Low:** Minor information leak or low‑impact bug → **Fix routinely**

---

## After Disclosure

Once a fix is available:

- **Upgrade:** Users should upgrade to the patched version promptly.  
- **Announcement:** We will publish a brief security advisory in our release notes and on our mailing list.  
- **CVE Assignment:** For high‑severity vulnerabilities, we will coordinate assignment of a CVE identifier.

---

### Thank You!

Thank you for helping to keep **Newsletter Creator** safe and secure. We take security seriously and appreciate contributions from the community. If you have any questions about this policy, feel free to reach out at **security@newslettercreator.dev**.
