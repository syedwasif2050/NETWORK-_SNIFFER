import scapy.all as scapy

# Function to analyze each captured packet
def process_packet(packet):
    # Hum sirf IP packets ko filter kar rahe hain
    if packet.haslayer(scapy.IP):
        ip_src = packet[scapy.IP].src    # Kahan se aa raha hai
        ip_dst = packet[scapy.IP].dst    # Kahan ja raha hai
        proto = packet[scapy.IP].proto   # Kaunsa protocol hai (TCP/UDP)
        
        print(f"[+] Packet: {ip_src} -> {ip_dst} | Protocol: {proto}")

print("===========================================")
print("   ARCHTECH INTERNSHIP: NETWORK SNIFFER    ")
print("===========================================")
print("[*] Starting packet capture... (Capturing 20 packets)")

# Sniffing function: count=20 means it will stop after 20 packets
scapy.sniff(prn=process_packet, count=20)

print("\n[*] Task 1 Completed Successfully.")